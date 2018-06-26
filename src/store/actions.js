import { auth, board } from '../api'

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
  }
}

export default actions 