<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <span class="board-title">{{board.title}}</span>
        </div>
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
                <List :data="list" />
              </div>
          </div>
        </div>
      </div>
    </div>
     <router-view></router-view>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import List from './List.vue'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

export default {
  components: { List },
  data() {
    return {
      bid: 0,
      loading: false,
      dragulaCards: null
    }
  },
  computed: {
    ...mapState({
      board: 'board'
    })
  },
  created() {
    this.fetchData()
  },
  updated() {
    if (this.dragulaCards) this.dragulaCards.destroy()
    
    this.dragulaCards = dragula([
      ...Array.from(this.$el.querySelectorAll('.card-list'))
    ]).on('drop', (el, wrapper, target, silblings) => {
      const targetCard = {
        id: el.dataset.cardId * 1, 
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
      'UPDATE_CARD'
    ]),
    fetchData() {
      this.loading = true
      this.FETCH_BOARD({id: this.$route.params.bid})
        .then(() => this.loading = false)
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
</style>
