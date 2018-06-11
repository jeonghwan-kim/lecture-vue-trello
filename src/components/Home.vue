<template>
  <div>
    <h2>Home</h2>
    <div v-if="hasBoard">
      <ul>
        <li v-for="(board, i) in boards" :key="i">
          <router-link :to="`/board/${board.id}`">
            {{board.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div>
      <button @click="onClickCreateBoard">보드 생성</button>
    </div>

    <div v-show="onCreateBoard">
      <form @submit.prevent="onSubmitCreateBoard">
        <input type="text" v-model="inputBoardTitle" ref="inputBoardTitle">
        <button type="submit" :disabled="!isValidInput">Create Board</button>
      </form>
    </div>
  </div>
</template>

<script>
import {board} from '../api'

export default {
  data(){
    return {
      boards: [],
      onCreateBoard: false,
      inputBoardTitle: '',
      isValidInput: false
    }
  },
  watch: {
    inputBoardTitle(val) {
      this.isValidInput = !!val.trim().length
    }
  },
  computed: {
    hasBoard() {
      return this.boards.length > 0
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      board.fetch().then(({list}) => {
        this.boards = list
      })
    },
    onClickCreateBoard() {
      this.onCreateBoard = true
      setTimeout(_=> this.$refs.inputBoardTitle.focus(), 1)
    },
    onSubmitCreateBoard() {
      if (!this.inputBoardTitle.trim()) return 
      
      board.create(this.inputBoardTitle).then(({item}) => {
        console.log(item)
        this.$router.push(`/board/${item.id}`)
      }).catch(err => {
        console.log(err)
      }).finally(()=> {
        this.onCreateBoard = false
      })
    }
  }
}
</script>
