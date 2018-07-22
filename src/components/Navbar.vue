<template>
  <nav class="header">
    <div class="header-logo">
      <router-link to="/">Trelno</router-link>
    </div>
    <div class="header-auth">
      <a v-if="isAuthenicated" href="" @click.prevent="logout">Logout</a>
      <router-link v-else to="/login">Login</router-link>
    </div>
  </nav>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      navbarColor: 'navbarColor',
      bodyColor: 'bodyColor',
    }),
    isAuthenicated() {
      return this.$store.getters.isAuthenticated
    },
  },
  watch: {
    bodyColor: 'updateTheme'
  },
  mounted() {
    this.updateTheme()
  },
  methods: {
    updateTheme() {
      this.$el.style.backgroundColor = this.navbarColor
      const body = document.querySelector('body')
      if (!body) return 
      body.style.backgroundColor = this.bodyColor
    },
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
  color: rgba(255,255,255,.5);
}
.header-logo {
  position: absolute;
  left: 50%;
  top: 7px;
  margin-left: -30px;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
}
.header-logo a:hover,
.header-logo a:focus {
  color: rgba(255,255,255,.9);
}
.header-auth {
  position: absolute;
  right: 15px;
  top: 5px;
}
.header-auth a {
  border-radius: 2px;
  padding: 0 10px;
  background-color: rgba(255,255,255, .5);
  color: white;
  transition: all .3s;
}
.header-auth a:hover,
.header-auth a:focus {
  background-color: rgba(255,255,255, .3);
}
</style>
