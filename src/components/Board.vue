<template>
  <div>
    <h2>{{board.title}}</h2>
    <div v-for="(list, i) in board.lists" :key="i">
      <ul>
        <li>
          <list :list="list" 
            @doneAddCard="fetchData" 
            @doneUpdateCard="fetchData"></list>
        </li>
      </ul>
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
