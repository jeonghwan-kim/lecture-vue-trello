<template>
  <div class="list">
    <h3>
      {{list.title}}
    </h3>
    <div>
      <div v-for="(card, i) in sortedCards" :key="i">
        <card-item :card="card" :boardId="list.boardId" 
          @dropCard="onDropCard"
          @dragoverCard="onDragoverCard"></card-item> 
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
    },
    sortedCards() {
      return [...this.list.cards].sort((a, b) => a.pos - b.pos)
    }
  },
  created () {
  },
  methods: {
    onDropCard({moveCardId, targetCardId}) {
      console.log('list: onDrop', moveCardId, targetCardId)

      let pos = 0
      const firstCard = this.sortedCards[0]

      if (targetCardId == firstCard.id) {
        pos = firstCard.pos / 2
      } else {
        const targetCardIdx = this.sortedCards.findIndex(card => card.id == targetCardId)
        if (!targetCardIdx) throw Error('no targetCardIdx')
        if (targetCardIdx < 1) throw Error('targetCardIdx < 1')

        const prevCard = this.sortedCards[targetCardIdx - 1]
        const targetCard = this.sortedCards[targetCardIdx]

        pos = (targetCard.pos + prevCard.pos) / 2
      }

      card.update(moveCardId, {pos})
        .then(_=> this.$emit('doneUpdateCard'))
        .catch(err => console.log(err))
    },
    onDragoverCard({moveCardId, targetCardId}) {
      console.log('onDragoverCard',moveCardId, targetCardId)
    },
    onDragover(evt) {
      const {y} = getPosition(evt.target)
      const listY = getPosition(evt.currentTarget).y
      console.log('list: onDragover', y, listY)
    },
    onClickAddCard() {
      this.isAddCard = true
      setTimeout(_=> this.$refs.inputCardTitle.focus(), 1)
    },
    onCancelAddCard(){
      this.isAddCard = false
    },
    onSubmitNewCard() {
      if (this.invalidInput) return 
      const lastCard = this.sortedCards[this.sortedCards.length - 1]
      let pos = 65535
      if (lastCard) pos = pos + pos

      card.create(this.inputCardTitle, this.list.id, pos).then(data => {
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
.list {
  display: inline-block;
  padding: 10px;
  border: 1px solid grey;
  background-color: burlywood;
  
}
</style>
