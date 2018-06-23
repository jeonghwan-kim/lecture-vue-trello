import axios from 'axios'
import router from '../router'

const domain = 'http://localhost:3000'
const Unauthorized = 401
const onUnauthorized = () => {
  router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`)
}

const request = {
  get(path) {
    return axios.get(`${domain + path}`)
      .catch(({response}) => {
        const {status} = response
        if (status === Unauthorized) return onUnauthorized()
        throw Error(response)
      })
  },
  post(path, data) {
    return axios.post(`${domain + path}`, data)
  },
  delete(path) {
    return axios.delete(`${domain + path}`)
  },
  put(path, data) {
    return axios.put(`${domain + path}`, data)
  }
}

const auth = {
  login(email, password) {
    return request.post('/login', {email, password}).then(({data}) => data)
  }
}

const board = {
  fetch(id) {
    if (id) {
      return request.get(`/boards/${id}`).then(({ data }) => data)
    }
    return request.get('/boards').then(({data}) => data)
  },
  create (title) {
    return request.post('/boards', { title }).then(({ data }) => data)
  }
}

const card = {
  fetch(id) {
    return request.get(`/cards/${id}`).then(({ data }) => data)
  },
  create(title, listId, pos) {
    return request.post(`/cards`, {title, listId, pos}).then(({ data }) => data)
  },
  update(id, data) {
    return request.put(`/cards/${id}`, data).then(({ data }) => data)
  }
}


export {
  auth,
  board,
  card
}
