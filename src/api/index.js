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

export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

export const auth = {
  login(email, password) {
    return request.post('/login', {email, password})
      .then(({data}) => data)
  }
}

export const board = {
  fetch(id) {
    if (id) {
      return request.get(`/boards/${id}`).then(({ data }) => data)
    }
    return request.get('/boards').then(({data}) => data)
  },
  create (title) {
    return request.post('/boards', { title }).then(({ data }) => data)
  },
  update(id, data) {
    return request.put(`/boards/${id}`, data).then(({ data }) => data)
  },
  destroy(id) {
    return request.delete(`/boards/${id}`)
  }
}

export const list = {
  create(data) {
    return request.post(`/lists`, data)
  },
  update(id, data) {
    return request.put(`/lists/${id}`, data).then(({ data }) => data)
  },
  destroy(id) {
    return request.delete(`/lists/${id}`).then(({ data }) => data)
  }
}

export const card = {
  fetch(id) {
    return request.get(`/cards/${id}`).then(({ data }) => data)
  },
  create({title, listId, pos}) {
    return request.post(`/cards`, {title, listId, pos}).then(({ data }) => data)
  },
  update(id, data) {
    return request.put(`/cards/${id}`, data).then(({ data }) => data)
  },
  destroy(id) {
    return request.delete(`/cards/${id}`)
  }
}
