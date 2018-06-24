<template>
  <div>
    <h2>Log in to Trello</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input type="text" name="email" v-model="email" autofocus placeholder="e.g., test@test.com" />
      </div>
      <div>
        <label for="password">Passwrod</label>
        <input type="password" v-model="password" placeholder="123123" />
      </div>
      <button type="submit" :disabled="invalidForm">Log In</button>
    </form>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      returnPath: '',
      error: ''
    }
  },
  computed: {
    invalidForm() {
      return !this.email || !this.password
    }
  },
  created() {
    this.returnPath = this.$route.query.returnPath || '/'
  },
  methods: {
    onSubmit() {
      const {email, password} = this
      this.$store.dispatch('LOGIN', {email, password})
        .then(() => {
          this.$router.push(this.returnPath)
        })
        .catch(err => {
          this.error = err.response.data.error
        })
    }
  }
}
</script>
