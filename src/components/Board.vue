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

export default {
  components: { List },
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
  methods: {
    ...mapActions([
      'FETCH_BOARD'
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
