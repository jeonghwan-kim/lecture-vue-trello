import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
