import axios from 'axios'
import {board} from './api'

const saveAccessToken = (accessToken) => {
  localStorage.accessToken = accessToken
}

const removeAccessToken = () => {
  delete localStorage.accessToken
}

const enhanceAccessToken = () => {
  const { accessToken } = localStorage
  if (!accessToken) return
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

const isAuthenticated = () => {
  if (!localStorage.accessToken) return Promise.reject()
  return board.fetch()
}

export {
  saveAccessToken,
  removeAccessToken,
  enhanceAccessToken,
  isAuthenticated
}