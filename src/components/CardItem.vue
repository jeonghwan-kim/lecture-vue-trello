<template>
  <div class="card-item" :data-card-id="card.id" :data-card-pos="card.pos">
    <router-link :to="`/board/${boardId}/card/${card.id}`">
      {{card.title}} {{card.id}} {{card.pos}}
    </router-link>
  </div>
</template>

<script>
export default {
  props: [
    'card',
    'boardId',
  ],
}
</script>
