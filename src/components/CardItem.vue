<template>
  <div class="card-item" :data-card-id="card.id" :data-card-pos="card.pos">
    <router-link :to="`/board/${boardId}/card/${card.id}`">
      {{card.title}} {{card.id}} {{card.pos}}
    </router-link>
    <a class="delete-card-btn" href="" @click.prevent="onClickDelete">&times;</a>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: [
    'card',
    'boardId',
  ],
  methods: {
    ...mapActions([
      'DELETE_CARD'
    ]),
    onClickDelete() {
      if (!window.confirm('Delete this card?')) return 
      this.DELETE_CARD(this.card.id)
    }
  }
}
</script>

<style scoped>
.card-item {
  background-color: #fff;
  border-radius: 3px;
  margin: 8px;
  padding: 6px 8px 2px;
  box-shadow: 0 1px 0 #ccc;
  position: relative;
}
.card-item a {
  text-decoration: none;
  color: #444;
}
.card-item:hover,
.card-item:focus {
  background-color: rgba(0,0,0, .1);
  cursor: pointer;
}
.delete-card-btn {
  position: absolute;
  right: 10px;
  top: 4px;
  text-decoration: none;
  font-size: 18px;
  color: #aaa;
}
</style>
