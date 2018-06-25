const getters = {
  isAuthenticated(state) {
    return !!state.accessToken
  },
  hasBoardList(state) {
    return state.boardList.length > 0
  }
}

export default getters