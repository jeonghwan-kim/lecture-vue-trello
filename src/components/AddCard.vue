<template>
  <div>
    <form @submit.prevent="onSubmitNewCard">
      <input type="text" v-model="inputCardTitle" ref="inputCardTitle">
      <button type="submit" :disabled="invalidInput">Add</button>
      <a href="" @click.prevent="$emit('close')">X</a>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  props: [ 'pos', 'listId' ],
  data() {
    return {
      inputCardTitle: ''
    }
  },
  computed: {
    invalidInput() {
      return !this.inputCardTitle.trim()
    }
  },
  mounted() {
    this.$refs.inputCardTitle.focus()
  },
  methods: {
    ...mapActions([
      'ADD_CARD'
    ]),
    onSubmitNewCard() {
      if (this.invalidInput) return 
      const {inputCardTitle, pos, listId} = this
      this.ADD_CARD({title: inputCardTitle, pos, listId})
        .finally(_=> this.inputCardTitle = '')
    },
  }
}
</script>
