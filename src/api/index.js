import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method, url, data) => {
  return axios({
    method, 
    url: DOMAIN + url, 
    data
  }).then(result => result.data)
    .catch(result => {
      const {status} = result.response
      if (status === UNAUTHORIZED) onUnauthorized()
<<<<<<< HEAD
      throw result.response
=======
      throw Error(result.response)
>>>>>>> axios를 래핑해서 사용하는 방법: api-service  구현
    })
}

export const board = {
  fetch() {
    return request('get', '/boards')
  }
}