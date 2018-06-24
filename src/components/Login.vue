<template>
  <div class="Login">
    <h2 class="Login-title">Log in to Trello</h2>
    <form @submit.prevent="onSubmit" class="pure-form">
      <div class="Login-input-control">
        <label for="email" class="Login-input-label">Email</label>
        <input type="text" name="email" v-model="email" placeholder="e.g., test@test.com" />
      </div>
      <div class="Login-input-control">
        <label for="password" class="Login-input-label">Passwrod</label>
        <input type="password" v-model="password" placeholder="123123" />
      </div>
      <div class="Login-input-control">
        <button type="submit" class="btn btn-success">Log In</button>
      </div>
    </form>
    <p v-if="error" class="Login-error">{{error}}</p>
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

<style>
.Login {
  width: 360px;
  margin: 60px auto;
}
.Login-title {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 20px;
}
.Login-input-label {
  display: block;
  font-size: 18px;
  margin-bottom: 5px;
}
.Login-input-control {
  margin-bottom: 20px;
}
.Login-input-control input {
  display: block;
  width: 95%;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 8px;
}
.Login-input-control .btn {
  width: 100%;
  padding: 10px;
  box-shadow: 0 2px 0 #3f6f21;
  font-weight: 800;
}
.Login-error {
  color: red;
}
</style>
