<template>
  <modal>
    <div slot="header">
      <h2>
        Create new board
        <a href="" class="modal-default-button" 
          @click.prevent="SET_IS_ADD_BOARD(false)">&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form" 
        @submit.prevent="onSubmitCreateBoard">
        <input class="form-control" type="text" v-model="inputBoardTitle" ref="inputBoardTitle">
      </form>
    </div>
    <div slot="footer">
      <button class="btn" :class="{'btn-success': isValidInput}" type="submit" form="add-board-form" :disabled="!isValidInput">
        Create Board</button>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal.vue'
import { mapMutations, mapActions } from 'vuex'

export default {
  components: { Modal },
  data () {
    return {
      inputBoardTitle: '',
      isValidInput: false
    }
  },
  watch: {
    inputBoardTitle(val) {
      this.isValidInput = !!val.trim().length
    }
  },
  mounted () {
    this.$refs.inputBoardTitle.focus()
  },
  methods: {
    ...mapMutations([
      'SET_IS_ADD_BOARD'
    ]),
    ...mapActions([
      'ADD_BOARD'
    ]),
    onSubmitCreateBoard() {
      if (!this.inputBoardTitle.trim()) return 

      this.ADD_BOARD(this.inputBoardTitle)
        .then(id => this.$router.push(`/board/${id}`))
        .catch(err => console.log(err))
        .finally(()=> (this.SET_IS_ADD_BOARD(false)))
    },
  }
}
</script>

