<template>
  <div id="app">
    <navbar />    
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0px;
}
#app {
  height: 100%;
}
.container {
  height: 100%;
}
</style>
