import Vue from 'vue'
import App from './App.vue'

const Login = { template: '<div>Login Page</div>' }
const NotFound = { template: '<div>Page not found</div>' }

const routes = {
  '/': App,
  '/login': Login
}

new Vue({
  el: '#app',
  computed: {
    VueComponent() {
      return routes[window.location.pathname] || NotFound
    }
  },
  render(h) {
    return h(this.VueComponent)
  }
})
