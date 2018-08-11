import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null,
    isAddBoard: false,
    boards: [],
  },
  getters: {
    isAuth(state) {
      return !!state.token
    }
  },
  mutations: {
    LOGIN (state, token) {
      if (!token) return 
      state.token = token
      localStorage.setItem('token', token)
      api.setAuthInHeader(token)
    },
    LOGOUT (state) {
      state.token = null
      delete localStorage.token
      api.setAuthInHeader(null)
    },
    SET_IS_ADD_BOARD (state, toggle) {
      state.isAddBoard = toggle
    },
    SET_BOARDS (state, boards) {
      state.boards = boards
    }
  },
  actions: {
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
})

const { token } = localStorage
store.commit('LOGIN', token)

export default store