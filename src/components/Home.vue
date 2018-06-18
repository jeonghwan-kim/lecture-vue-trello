<template>
  <div>
    <div class="title">
      <h2>
        <i class="fas fa-user"></i>
        Personal Boards
      </h2>
    </div>
    <div v-if="hasBoard">
      <span v-for="(board, i) in boards" :key="i">
        <router-link :to="`/board/${board.id}`">
          <div class="board-item text-white">
            {{board.title}}
          </div>
        </router-link>
      </span>
    </div>
    
    <div class="board-item add-board">
      <a href="" class="text-grey" @click.prevent="onClickCreateBoard">Create new board...</a>
    </div>

    <modal v-if="onCreateBoard">
      <div slot="header">
        <h2>
          Create new board
          <a href="" class="modal-default-button" @click.prevent="onCreateBoard = false">
            <i class="fas fa-times"></i>
          </a>
        </h2>
      </div>
      <div slot="body">
        <form id="add-board-form" @submit.prevent="onSubmitCreateBoard">
          <input type="text" v-model="inputBoardTitle" ref="inputBoardTitle">
        </form>
      </div>
      <div slot="footer">
        <button type="submit" class="btn btn-success" form="add-board-form"
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

<style>
.board-item {
  display: inline-block;
  padding: 10px;
  background-color: lightskyblue;
  border-radius: 3px;
  width: 150px;
  height: 80px;
  font-weight: bold;
  font-size: 120%;
  margin: 0 15px 15px 0;
}
.board-item.add-board {
  background-color: #e2e4e6;
  font-weight: 500;
  vertical-align: middle;
  display: table-cell;
  font-size: 100%;
}
.modal-add-board {

}
</style>
