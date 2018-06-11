import axios from 'axios'

const domain = 'http://localhost:3000'
const request = {
  get(path) {
    return axios.get(`${domain + path}`)
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
  create(title, listId) {
    return request.post(`/cards`, {title, listId}).then(({ data }) => data)
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
