<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list">
      <div class="board-item" v-for="(board, i) in boardList" :key="i" :data-bgcolor="board.bgColor">
        <router-link :to="`/board/${board.id}`">
          <div class="board-item-title">{{board.title}}</div>
        </router-link>
      </div>
      <div class="board-item">
        <a class="new-board-btn" href="" @click.prevent="onClickCreateBoard">
          Create new board...
        </a>
      </div>
    </div>
    <AddBoard v-if="isAddBoard" />
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
    this.SET_THEME()
  },
  updated() {
    Array.from(document.querySelectorAll('.board-item')).forEach(el => {
      el.style.backgroundColor = el.dataset.bgcolor || '#ddd'
    })
  },
  methods: {
    ...mapMutations([
      'SET_IS_ADD_BOARD',
      'SET_THEME'
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

<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0,0,0, .1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>
