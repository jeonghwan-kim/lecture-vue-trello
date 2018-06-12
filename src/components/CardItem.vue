<template>
  <div class="card-item" draggable="true" @dragstart="onDragstart"
    @drop.prevent="onDrop" @dragover.prevent="onDragover" :data-card-id="card.id">
    <router-link :to="`/board/${boardIㅇd}/card/${card.id}`" class="text-darkgrey">
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
  min-height: 20px;
  display: block;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 1px rgba(0,0,0,.1);
  background-color: white;
  padding: 6px 6px 2px 8px;
}
</style>
