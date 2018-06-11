<template>
  <div class="card-item" draggable="true" @dragstart="onDragstart"
    @drop.prevent="onDrop" @dragover.prevent="onDragover" :data-card-id="card.id">
    <router-link :to="`/board/${boardId}/card/${card.id}`">
      {{card.title}}
    </router-link>
    {{card.y}}
  </div>
</template>

<script>
export default {
  props: [
    'card',
    'boardId'
  ],
  methods: {
    onDragstart(evt) {
      console.log('cardItem: onDragstart')
      evt.dataTransfer.setData('cardId', this.card.id)
    },
    onDragover(evt) {
      this.emitEvent('dragoverCard', evt)
    },
    onDrop(evt) {
      this.emitEvent('dropCard', evt)
    },
    emitEvent(name, evt) {
      const cardId = evt.dataTransfer.getData('cardId')
      if (cardId == this.card.id) return 
      this.$emit(name, {
        moveCardId: cardId,
        targetCardId: this.card.id,
      })
    }
  }
}
</script>

<style>
.card-item {
  display: block;
  padding: 10px;
  border: solid 1px grey;
  border-radius: 4px;
  background-color: cyan;
}
</style>
