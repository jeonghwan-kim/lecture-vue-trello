<template>
  <div class="list add-list">
    <input class="form-control" v-if="isAddList" type="text" ref="inputTitle" v-model="inputTitle"
    @keyup.enter="onSubmitTitle" @blur="resotre">
    <a v-else @click="onClickAddList">&plus; Add another list</a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      isAddList: false,
      inputTitle: ''
    }
  },
  computed: {
    ...mapState({
      board: 'board'
    })
  },
  methods: {
    ...mapActions([
      'ADD_LIST'
    ]),
    onClickAddList() {
      this.isAddList = true
      this.$nextTick(_=> {
        this.$refs.inputTitle.focus()
      })
    },
    onSubmitTitle() {
      this.inputTitle = this.inputTitle.trim()
      if (!this.inputTitle) return this.resotre()
      const title = this.inputTitle
      const pos = this.board.lists[this.board.lists.length - 1].pos * 2
      const boardId = this.board.id
      this.ADD_LIST({title, pos, boardId}).then(_=> this.resotre())
    },
    resotre() {
      this.isAddList = false
      this.inputTitle = ''
    }
  }
}
</script>

<style scoped>
.add-list {
  background-color: rgba(0,0,0, .1);
  padding: 12px;
  color: #ddd;
  transition: all .3s;
}  
.add-list:hover,
.add-list:focus {
  background-color: rgba(0,0,0, .3);
  cursor: pointer;
}
</style>
