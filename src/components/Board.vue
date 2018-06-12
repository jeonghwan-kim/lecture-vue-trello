<template>
  <div class="board">
    <div class="title board-title-section text-white">
      <ul>
        <li><h2 class="board-title">{{board.title}}</h2></li>
        <li class="board-title-sperator">|</li>
        <li>Personal</li>
        <li class="board-title-sperator">|</li>
        <li><i class="fas fa-lock"></i> Private</li>
      </ul>
    </div>
    <div class="list-wrapper">
      <list v-for="(list, i) in board.lists" :key="i" :list="list" 
        @doneAddCard="fetchData" @doneUpdateCard="fetchData"></list>
    </div>
    <router-view :boardId="board.id"></router-view>
  </div>
</template>

<script>
import {board} from '../api'
import List from './List.vue'

export default {
  data () {
    return {
      board: {},
    }
  },
  created() {
    document.querySelector('body').style.backgroundColor = 'rgb(0, 121, 191)'
  },
  destroyed() {
    document.querySelector('body').style.backgroundColor = '#fff'
  },
  components: {
    List
  },
  watch: {
    '$route': {
      handler: 'fetchData',
      immediate: true
    }
  },
  methods: {
    fetchData() {
      board.fetch(this.$route.params.id).then(({item}) => {
        this.board = item
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style>
.board {
  width: 100%;
} 
.board-title-section {
  font-size: 100%;
  font-weight: normal;
}
.board-title-section li {
  display: inline;
}
.board-title-sperator {
  padding: 0 10px;
  font-weight: 100;
  color: rgba(255,255,255,.5);
}
.board-title {
  font-size: 120%;
  display: inline;
}
.list-wrapper {
  overflow-x: scroll;
  width: max-content;
}
</style>
