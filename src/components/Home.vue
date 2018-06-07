<template>
  <div>
    <h2>Home</h2>
    <div v-if="hasBoard">
      <ul>
        <li v-for="(b, i) in boards" :key="i">
          {{board.title}}
        </li>
      </ul>
    </div>
    <div v-else>
      <button>보드 생성</button>
    </div>
  </div>
</template>

<script>
import {board} from '../api'

export default {
  data(){
    return {
      boards: []
    }
  },
  computed: {
    hasBoard() {
      return !!this.boards.length
    }
  },
  created() {
    board.fetch().then(({list}) => {
      this.boards = list
    })
  },
  mounted() {
    
  }
}
</script>

