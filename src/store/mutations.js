import { setAuthInHeader } from '../api'

const mutations = {
  LOGIN (state, {accessToken}) {
    if (!accessToken) return
    state.accessToken = accessToken
    localStorage.accessToken = accessToken
    setAuthInHeader(accessToken)
  },
  LOGOUT (state) {
    state.accessToken = null 
    delete localStorage.accessToken
    setAuthInHeader(null)
  }
}

export default mutations 