import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Board from '../components/Board'
import NotFound from '../components/NotFound'
import {isAuthenticated} from '../auth'

Vue.use(VueRouter)

const requireAuth = () => (from, to, next) => {
  isAuthenticated().then(_=> {
    return next()
  }).catch(_=> {
    next(`/login?returnPath=${encodeURIComponent(from.path)}`)
  })
}

export default new VueRouter({
  routes: [
    { path: '/', component: Home, beforeEnter: requireAuth() },
    { path: '/login', component: Login },
    { path: '/board/:id', component: Board, beforeEnter: requireAuth() },
    { path: '*', component: NotFound },
  ]
})