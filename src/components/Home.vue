<template>
  <div>
    <h2>Personal Boards</h2>
    <ul>
      <li v-for="(board, i) in boards" :key="i">
        <router-link :to="`/board/${board.id}`">
          {{board.title}}
        </router-link>
      </li>
      <li>
        <a href="" @click.prevent="onClickCreateBoard">Create new board...</a>
      </li>
    </ul>
    

    <modal v-if="onCreateBoard">
      <div slot="header">
        <h2>
          Create new board
          <a href="" class="modal-default-button" @click.prevent="onCreateBoard = false">
            X
          </a>
        </h2>
      </div>
      <div slot="body">
        <form id="add-board-form" @submit.prevent="onSubmitCreateBoard">
          <input type="text" v-model="inputBoardTitle" ref="inputBoardTitle">
        </form>
      </div>
      <div slot="footer">
        <button type="submit" form="add-board-form"
            :disabled="!isValidInput">Create Board</button>
      </div>
    </modal>
  </div>
</template>

<script>
import {board} from '../api'
import Modal from './Modal.vue'

export default {
  components: {
    Modal
  },
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
      setTimeout(_=> this.$refs.inputBoardTitle.focus(), 111)
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
    },
  }
}
</script>

