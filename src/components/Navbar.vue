<template>
  <nav class="header">
    <div class="header-logo">
      <router-link to="/">Trelno</router-link>
    </div>
    <div class="header-user">
      <a v-if="isAuthenicated" href="" @click.prevent="logout">Logout</a>
      <router-link v-else to="/login">Login</router-link>
    </div>
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

<style>
.header {
  flex: none;
  background-color: rgba(0,0,0,.15);
  height: 32px;
  padding: 4px;
}
.header a {
  display: block;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  color:  rgba(255,255,255,.5);
}
.header-logo {
  position: absolute;
  left: 50%;
  margin-left: -30px;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
}
.header-logo a:hover,
.header-logo a:focus {
  color: rgba(255,255,255,.9);
}
.header-user {
  position: absolute;
  right: 15px;
}
.header-user a {
  border-radius: 2px;
  padding: 0 10px;
  background-color: rgba(255,255,255, .5);
  color: white;
}
.header-user a:hover,
.header-user a:focus {
  background-color: rgba(255,255,255, .3);
}
</style>
