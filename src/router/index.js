import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'

Vue.use(VueRouter)

const Login = { template: '<div>Login Page</div>' }
const NotFound = { template: '<div>Page not found</div>' }

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: App },
    { path: '/login', component: Login },
    { path: '*', component: NotFound }
  ]
})

export default router
