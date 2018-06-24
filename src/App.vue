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
/* input[type=text] {
  width: 96%;
  border-radius: 4px;
  border: none;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
  margin-bottom: 10px;
  padding: 5px;
} */
a, 
a:hover,
a:focus,
a:visited {
  text-decoration: none;
  color: #000;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
h1, h2, h3, h4, h5, h6 {
  padding: 0;
  margin: 0;
}

.container {
  margin-top: 43px;
  padding: 5px 20px 60px;;
}
.title {
    padding: 15px 0;
}
.btn {
  padding: 4px 16px;
  min-height: 32px;
  vertical-align: top;
  border: none;
  border-radius: 4px;
}
.btn-success {
  background-color: #5aac44;
  box-shadow: 0 1px 0 #519839;
  color: white;
}
.btn[disabled=disabled] {
  color: #b6bbbf;
  background: #f8f9f9;
  box-shadow: none;
}
.text-white {
  color: #ffffff;
}
.text-grey {
  color: #838c91;
}
.text-darkgrey {
  color: #4d4d4d;
}
</style>
