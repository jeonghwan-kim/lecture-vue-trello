<template>
  <div>
    <h2>{{board.title}} <small> | Personal | Private</small></h2>
    <div class="list-wrapper">
      <list v-for="list in board.lists" :key="list.pos" :list="list"></list>
    </div>
    <router-view :boardId="board.id"></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import List from './List.vue'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

export default {
  components: { List },
  data() {
    return {
      drakeList: null,
      drake: null
    }
  },
  watch: {
    $route() {
      this.fetchData()
    }
  },
  computed: {
    ...mapState({
      board: 'board'
    })
  },
  created () {
    this.fetchData()
  },
  updated () {
    if (this.drakeList) this.drakeList.destroy()
    if (this.drake) this.drake.destroy()

    this.drakeList = dragula([...this.$el.querySelectorAll('.list-wrapper')], {
      invalid:  (el, handle) => {
        return !/^list/.test(handle.className)
      },
      drop: (el, wrapper, target, siblings) => {
        const targetList = {
          id: el.dataset.listId * 1,
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
      }
    })

    this.drake = dragula([...this.$el.querySelectorAll('.card-list')], {
      on: (el, wrapper, target, silblings) => {
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
      }
    })
  },
  methods: {
    ...mapActions([
      'FETCH_BOARD',
      'UPDATE_CARD',
      'UPDATE_LIST'
    ]),
    fetchData () {
      this.FETCH_BOARD(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
small {
  font-size: 60%;
}
</style>
