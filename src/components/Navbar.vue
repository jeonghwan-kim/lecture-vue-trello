<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-menu-link logo">Trelno</router-link>
    <a v-if="isAuthenicated" 
      href="" class="navbar-menu-link right" 
      @click.prevent="logout">Logout</a>
    <router-link v-else 
      to="/login" class="navbar-menu-link right">Login</router-link>
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
.navbar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 6px;
  background-color: #026aa7;
  text-align: center;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.navbar > .logo {
  width: 50px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background-color: rgba(0,0,0,0);
  color: rgba(255,255,255, .4);
}
.navbar > .right {
  position: absolute;
  right: 10px;
}
.navbar-menu-link {
  display: inline-block;
  padding: 5px 10px;
  background: rgba(255,255,255,.5);
  border-radius: 3px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>
