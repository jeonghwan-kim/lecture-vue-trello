<template>
  <div>
    <router-link :to="`/board/${boardId}/card/${card.id}`">
      {{card.title}}
    </router-link>
  </div>
</template>

<script>
export default {
  props: [
    'card',
    'boardId'
  ],
}
</script>

<style>

</style>
