<template>
  <div>
    <h3>
      {{list.title}}
    </h3>
    <div>
      <div v-for="(card, i) in list.cards" :key="i">
        <card-item :card="card" :boardId="list.boardId"></card-item>
      </div>
    </div>
    <div v-show="isAddCard">
      <form @submit.prevent="onSubmitNewCard">
        <div>
          <input type="text" v-model="inputCardTitle" ref="inputCardTitle">
        </div>
        <div>
          <button type="submit" :disabled="invalidInput">Add</button>
          <a href="" @click.prevent="onCancelAddCard">X</a>
        </div>
      </form>
    </div>
    <div>
      <a href="" @click.prevent="onClickAddCard">Add a card...</a>
    </div>
  </div>
</template>

<script>
import {card} from '../api'
import CardItem from './CardItem.vue'

export default {
  components: {
    CardItem
  },
  props: [
    'list'
  ],
  data() {
    return {
      inputCardTitle: '',
      isAddCard: false
    }
  },
  computed: {
    invalidInput() {
      return !this.inputCardTitle.trim()
    }
  },
  methods: {
    onClickAddCard() {
      this.isAddCard = true
      setTimeout(_=> this.$refs.inputCardTitle.focus(), 1)
    },
    onCancelAddCard(){
      this.isAddCard = false
    },
    onSubmitNewCard() {
      if (this.invalidInput) return 

      card.create(this.inputCardTitle, this.list.id).then(data => {
        console.log(data)
        this.$emit('doneAddCard')
      }).catch(err => {
        console.log(err)
      }).finally(_=>{
        this.inputCardTitle = ''
        this.isAddCard = false
      })
    },
  }
}
</script>

<style>

</style>
