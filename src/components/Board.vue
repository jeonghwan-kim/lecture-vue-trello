<template>
  <div>
    <h2>{{board.title}} <small> | Personal | Private</small></h2>
    <ul>
      <li v-for="(list, i) in board.lists" :key="i">
        <list :list="list" @doneAddCard="fetchData" @doneUpdateCard="fetchData"></list>
      </li>
    </ul>
    <router-view :boardId="board.id"></router-view>
  </div>
</template>

<script>
import {board} from '../api'
import List from './List.vue'

export default {
  components: {
    List
  },
  data () {
    return {
      board: {},
    }
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

<style scoped>
small {
  font-size: 60%;
}
li {
  display: inline-block;
}
</style>
