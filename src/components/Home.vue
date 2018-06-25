<template>
  <div>
    <h2>Personal Boards</h2>
    <ul>
      <li v-for="(board, i) in boardList" :key="i">
        <router-link :to="`/board/${board.id}`">
          {{board.title}}
        </router-link>
      </li>
      <li>
        <a href="" @click.prevent="onClickCreateBoard">Create new board...</a>
      </li>
    </ul>
    <add-board v-if="isAddBoard"></add-board>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { board } from '../api'
import AddBoard from './AddBoard.vue'

export default {
  components: { AddBoard },
  computed: {
    ...mapState({
        isAddBoard: 'isAddBoard',
        boardList: 'boardList'
      }),
  },
  created() {
    this.FETCH_BOARD_LIST()
  },
  methods: {
    ...mapMutations([
      'SET_IS_ADD_BOARD'
    ]),
    ...mapActions([
      'FETCH_BOARD_LIST',
    ]),
    onClickCreateBoard() {
      this.SET_IS_ADD_BOARD(true)
    }
  }
}
</script>

