const getters = {
  isAuthenticated(state) {
    return !!state.accessToken
  }
}

export default getters