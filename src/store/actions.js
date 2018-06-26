import { auth, board, card } from '../api'

const actions = {
  LOGIN({ commit }, { email, password }) {
    return auth.login(email, password)
      .then(({ accessToken }) => commit('LOGIN', { accessToken }))
  },
  FETCH_BOARD_LIST ({commit}) {
    return board.fetch()
      .then(data => commit('SET_BOARD_LIST', data))
  },
  FETCH_BOARD ({commit}, id) {
    return board.fetch(id)
      .then(data => commit('SET_BOARD', data))
  },
  ADD_BOARD (_, title) {
    return board.create(title)
      .then(({item}) => item.id)
  },
  ADD_CARD ({state, dispatch}, {title, pos, listId}) {
    return card.create({title, pos, listId})
      .then(_=> dispatch('FETCH_BOARD', state.board.id))
  },
  UPDATE_CARD({ state, dispatch }, {id, pos}) {
    return card.update(id, { pos })
      .then(_ => dispatch('FETCH_BOARD', state.board.id))
  },
}

export default actions 