import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { setAccessTokenOnHttpHeader} from './auth'

setAccessTokenOnHttpHeader()

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
