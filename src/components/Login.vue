<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input v-model="email" />
      <input type="password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import {auth} from '../api'
import {saveAccessToken, enhanceAccessToken} from '../auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      returnPath: '',
    }
  },
  created() {
    this.returnPath = this.$route.query.returnPath || '/'
  },
  methods: {
    onSubmit() {
      auth.login(this.email, this.password).then(({accessToken}) => {
        console.log(accessToken)
        saveAccessToken(accessToken)
        enhanceAccessToken()
        this.$router.push(this.returnPath)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

