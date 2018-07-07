<template>
  <div class="settings">
    <a href="" @click.prevent="onClickClose">X</a>
    <h2>Menu</h2>
    <ul>
      <li><a href="" @click.prevent="onClickDeleteBoard">Delete Board</a></li>
      <li>Change Background</li>
      <ul>
        <li><a href="" @click.prevent="onClickChangeColor('rgb(210, 144, 52)')">orange</a></li>
      </ul>
    </ul>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  computed: {
    ...mapState({
      board: 'board'
    })
  },
  methods: {
    ...mapMutations([
      'SET_IS_SHOW_BOARD_MENU'
    ]),
    ...mapActions([
      'DELETE_BOARD',
      'UPDATE_BOARD'
    ]),
    onClickClose() {
      this.SET_IS_SHOW_BOARD_MENU(false)
    },
    onClickDeleteBoard() {
      if (!confirm(`Delete ${this.board.title} Board?`)) return 
      this.DELETE_BOARD(this.board.id)
      .then(_=> this.$router.push('/'))
    },
    onClickChangeColor(color) {
      const id = this.board.id
      const bgColor = color
      this.UPDATE_BOARD({id, bgColor}).then(_=> {
        document.querySelector('body').style.backgroundColor = this.board.bgColor
      })
    }
  }
}
</script>

<style scoped>
.settings {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: gray;
  width: 300px;
}
</style>
