<template>
  <div>
    <h2>{{board.title}}</h2>
    <div v-for="(list, i) in board.lists" :key="i">
      <ul>
        <li>
          {{list.title}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {board} from '../api'

export default {
  data () {
    return {
      board: {}
    }
  },
  watch: {
    '$router': {
      handler: 'fetchData',
      immediate: true
    }
  },
  methods: {
    fetchData() {
      board.fetch(this.$route.params.id).then(({item}) => {
        console.log(item)
        this.board = item
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
