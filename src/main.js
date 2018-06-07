import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {enhanceAccessToken} from './auth'

enhanceAccessToken()

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
