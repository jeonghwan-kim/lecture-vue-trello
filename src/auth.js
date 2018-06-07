import axios from 'axios'

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

export {
  saveAccessToken,
  removeAccessToken,
  enhanceAccessToken
}