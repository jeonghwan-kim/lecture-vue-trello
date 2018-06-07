import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Board from '../components/Board'

Vue.use(VueRouter)

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = false
  if (isAuthenticated) return next()
  next(`/login?returnPath=${encodeURIComponent(from.path)}`)
}

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/board', component: Board, beforeEnter: requireAuth() },
  ]
})