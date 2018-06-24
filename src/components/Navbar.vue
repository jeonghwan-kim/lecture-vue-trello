<template>
  <nav>
    <router-link to="/">Trelno</router-link>
    <a v-if="isAuthenicated" href="" @click.prevent="logout">Logout</a>
    <router-link v-else to="/login">Login</router-link>
  </nav>
</template>

<script>
export default {
  computed: {
    isAuthenicated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    logout() {
      this.$store.commit('LOGOUT')
      this.$router.push('/login')
    }
  }
}
</script>
