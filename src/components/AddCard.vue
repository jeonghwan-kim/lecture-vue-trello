<template>
  <div class="add-card">
    <form @submit.prevent="onSubmitNewCard">
      <input class="form-control" type="text" v-model="inputCardTitle" ref="inputCardTitle" @blur="$emit('close')">
      <button class="btn btn-success" type="submit" :disabled="invalidInput">Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
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

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>
