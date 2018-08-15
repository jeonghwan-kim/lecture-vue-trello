<template>
  <div>
    <div v-if="loading">loading board...</div>
    <div v-else>
      <pre>{{board}}</pre>
      <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
      <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
      <hr />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      bid: 0,
      loading: false
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
  methods: {
    ...mapActions([
      'FETCH_BOARD'
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
