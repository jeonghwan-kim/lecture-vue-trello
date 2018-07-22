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
  },
  SET_BOARD_LIST (state, {list}) {
    state.boardList = list.map(board => board)
  },
  SET_BOARD(state, {item}) {
    state.board = item
  },
  SET_IS_ADD_BOARD (state, toggle) {
    state.isAddBoard = toggle
  },
  SET_CARD (state, card) {
    state.card = card
  },
  SET_IS_SHOW_BOARD_MENU (state, toggle) {
    state.isShowBoardMenu = toggle
  },
  SET_THEME (state, color) {
    state.bodyColor = color ? color : 'rgb(255,255,255)'
    state.navbarColor = color ? 'rgba(0,0,0,.15)' : '#026aa7'
  }
}

export default mutations 