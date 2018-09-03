import * as api from '../api'

const actions = {
  LOGIN ({commit}, {email, password}) {
    return api.auth.login(email, password)
      .then(({accessToken}) => commit('LOGIN', accessToken))
  },
  ADD_BOARD (_, {title}) {
    return api.board.create(title)
  },
  FETCH_BOARDS ({commit}) {
    return api.board.fetch().then(data => {
      commit('SET_BOARDS', data.list)
    })
  }
}  

export default actions
