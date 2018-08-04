<template>
  <div>
    Board 
    <div>bid: {{bid}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bid: 0
    }
  },
  created() {
    this.bid = this.$route.params.bid
  }
}
</script>

<style>

</style>
