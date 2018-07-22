<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <input class="form-control" v-if="isEditTitle" type="text" v-model="inputTitle" ref="inputTitle"
          @keyup.enter="onTitleSubmit" @blur="onTitleSubmit">
          <span v-else @click="onClickTitle" class="board-header-btn board-title">{{board.title}}</span>
          <a class="board-header-btn show-menu" href="" @click.prevent="onClickShowMenu" >... Show Menu</a>
        </div>
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
              <list :list="list"></list>
            </div>
            <div class="list-wrapper">
              <add-list />
            </div>
          </div>
        </div>
        <board-settings v-if="isShowBoardMenu"/>
        <router-view :boardId="board.id"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import List from './List.vue'
import AddList from './AddList.vue'
import BoardSettings from './BoardSettings.vue'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

export default {
  components: { List, AddList, BoardSettings },
  data() {
    return {
      drakeList: null,
      drake: null,
      isEditTitle: false,
      inputTitle: ''
    }
  },
  watch: {
    $route() {
      this.fetchData()
    }
  },
  computed: {
    ...mapState({
      board: 'board',
      isShowBoardMenu: 'isShowBoardMenu'
    })
  },
  created () {
    this.fetchData().then(_=> {
      this.inputTitle = this.board.title
      this.SET_THEME(this.board.bgColor)
    })
  },
  updated () {
    if (this.drakeList) this.drakeList.destroy()
    if (this.drake) this.drake.destroy()

    this.drakeList = dragula([...this.$el.querySelectorAll('.list-section')], {
      invalid:  (el, handle) => {
        console.log(handle.className)
        return !/^list/.test(handle.className)
      }
    })
    .on('drop', (el, wrapper, target, siblings) => {
      const targetList = {
        id: el.children[0].dataset.listId * 1,
        pos: 65535
      }
      let prevList = null
      let nextList = null 

      Array.from(wrapper.querySelectorAll('.list'))
        .forEach((el, idx, arr) => {
          const listId = null
          const listFound = targetList.id === (el.dataset.listId * 1)

          if (!listFound) return 

          prevList = idx > 0 ? {
            id: arr[idx - 1].dataset.listId * 1,
            pos: arr[idx - 1].dataset.listPos * 1,
          } : null

          nextList = idx < arr.length - 1 ? {
            id: arr[idx + 1].dataset.listId * 1,
            pos: arr[idx + 1].dataset.listPos * 1,
          } : null
        })

      if (!prevList && nextList) targetList.pos = nextList.pos / 2
      else if (!nextList && prevList) targetList.pos = prevList.pos * 2
      else if (nextList && prevList) targetList.pos = (prevList.pos + nextList.pos) / 2

      this.UPDATE_LIST(targetList)
    })

    this.drake = dragula([...this.$el.querySelectorAll('.card-list')])
    .on('drop', (el, wrapper, target, silblings) => {
      const targetCard = {
        id: el.dataset.cardId * 1, 
        listId: wrapper.dataset.listId * 1,
        pos: 65535,
      }
      let prevCard = null
      let nextCard = null

      Array.from(wrapper.querySelectorAll('.card-item'))
        .forEach((el, idx, arr) => {
          const cardId = el.dataset.cardId * 1

          if (targetCard.id === cardId) {
            prevCard = idx > 0 ? {
              id: arr[idx - 1].dataset.cardId * 1,
              pos: arr[idx - 1].dataset.cardPos * 1,
            } : null
            nextCard = idx < arr.length - 1 ? {
              id: arr[idx + 1].dataset.cardId * 1,
              pos: arr[idx + 1].dataset.cardPos * 1,
            } : null
          }
        })

      if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2
      else if (!nextCard && prevCard) targetCard.pos = prevCard.pos * 2
      else if (nextCard && prevCard) targetCard.pos = (prevCard.pos + nextCard.pos) / 2

      this.UPDATE_CARD(targetCard)
    })
  },
  methods: {
    ...mapActions([
      'FETCH_BOARD',
      'UPDATE_BOARD',
      'UPDATE_CARD',
      'UPDATE_LIST'
    ]),
    ...mapMutations([
      'SET_IS_SHOW_BOARD_MENU',
      'SET_THEME'
    ]),
    fetchData () {
      return this.FETCH_BOARD(this.$route.params.id)
    },
    onClickTitle() {
      this.isEditTitle=true
      this.$nextTick(_=> this.$refs.inputTitle.focus())
    },
    onTitleSubmit() {
      this.inputTitle = this.inputTitle.trim()
      if (!this.inputTitle) return 
      const id = this.board.id
      const title = this.inputTitle

      if (title === this.board.title) return this.isEditTitle = false

      this.UPDATE_BOARD({ id, title })
        .then(_=> (this.isEditTitle = false))
    },
    onClickShowMenu() {
      this.SET_IS_SHOW_BOARD_MENU(true)
    }
  }
}
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
} 
.board-header input[type=text] {
  width: 200px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0,0,0,.15);
  cursor: pointer;
}
.board-title {
  font-weight: 700;
  font-size: 18px;
}
.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}

.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}

.card-item.gu-transit {
  background-color: #555 !important;
}
.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
/* .list-wrapper.gu-transit .list {
  background-color: #555 !important;
  color: #555 !important;
  opacity: 1 !important;
}
.list-wrapper.gu-mirror .list {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
} */
</style>
