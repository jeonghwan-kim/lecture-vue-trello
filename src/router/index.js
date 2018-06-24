import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Board from '../components/Board'
import Card from '../components/Card'
import NotFound from '../components/NotFound'
import store from '../store'

Vue.use(VueRouter)

const requireAuth = () => (from, to, next) => {
  !!store.state.accessToken ? 
    next() :
    next(`/login?returnPath=${encodeURIComponent(from.path)}`)
}

export default new VueRouter({
  routes: [{
    path: '/', 
    component: Home, 
    beforeEnter: requireAuth() 
  }, { 
    path: '/login', 
    component: Login 
  }, { 
    path: '/board/:id', 
    component: Board, 
    beforeEnter: requireAuth(),
    children: [
      { 
        path: 'card/:cid', 
        component: Card 
      }
    ]  
  }, { 
    path: '*', 
    component: NotFound 
  }]
})