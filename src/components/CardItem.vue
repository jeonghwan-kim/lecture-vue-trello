<template>
  <div class="card-item" :data-card-id="card.id" :data-card-pos="card.pos">
    <a href="" @click.prevent="onClickDelete">X</a>
    <router-link :to="`/board/${boardId}/card/${card.id}`">
      {{card.title}} {{card.id}} {{card.pos}}
    </router-link>
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
  background-color: yellow;
  margin: 5px;
  padding: 10px;
}
</style>
