import * as api from '../api'

const actions = {
  LOGIN ({commit}, {email, password}) {
    return api.auth.login(email, password)
      .then(({accessToken}) => commit('LOGIN', accessToken))
  },
  ADD_BOARD (_, {title}) {
<<<<<<< HEAD
    return api.board.create(title).then(data => data.item)
=======
    return api.board.create(title).then(data => data.itme)
>>>>>>> ADD_BOARD 액션 응답값 개선
  },
  FETCH_BOARDS ({commit}) {
    return api.board.fetch().then(data => {
      commit('SET_BOARDS', data.list)
    })
  },
  FETCH_BOARD ({commit}, {id}) {
    return api.board.fetch(id).then(data => {
      commit('SET_BOARD', data.item)
    })
  }
}  

export default actions
