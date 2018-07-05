<template>
  <div>
    <h2>{{board.title}} <small> | Personal | Private</small></h2>
    <ul>
      <li v-for="(list, i) in board.lists" :key="i">
        <list :list="list"></list>
      </li>
    </ul>
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
    if (this.drake) this.drake.destroy()

    this.drake = dragula([...this.$el.querySelectorAll('.list')])
      .on('drop', (el, wrapper, target, silblings) => {
        const targetCard = {
          id: el.children[0].dataset.cardId * 1, 
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
      'UPDATE_CARD'
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
li {
  display: inline-block;
}
</style>
