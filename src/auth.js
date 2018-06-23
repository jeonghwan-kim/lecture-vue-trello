import axios from 'axios'

export const saveAccessToken = (accessToken) => {
  localStorage.accessToken = accessToken
}

export const removeAccessToken = () => {
  delete localStorage.accessToken
}

export const setAccessTokenOnHttpHeader = () => {
  const { accessToken } = localStorage
  if (!accessToken) return
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export const isAuthenticated = () => {
  return !!localStorage.accessToken
}
