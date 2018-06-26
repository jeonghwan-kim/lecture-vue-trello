<template>
  <ul>
    <li>
      <h3>{{list.title}}</h3>
    </li>
    <li v-for="(card, i) in sortedCards" :key="i" >
      <card-item :card="card" :boardId="list.boardId" 
        @dropCard="onDropCard"
        @dragoverCard="onDragoverCard"></card-item> 
    </li>
    <li v-if="isAddCard">
      <add-card :pos="lastCardPos" :listId="list.id" @close="isAddCard = false"></add-card>      
    </li>
    <li>
      <a href="" @click.prevent="isAddCard = true">
        Add a card...
      </a>
    </li>
  </ul>
</template>

<script>
import {card} from '../api'
import CardItem from './CardItem.vue'
import AddCard from './AddCard.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: { CardItem, AddCard },
  props: ['list'],
  data() {
    return {
      isAddCard: false
    }
  },
  computed: {
    sortedCards() {
      return [...this.list.cards].sort((a, b) => a.pos - b.pos)
    },
    lastCardPos() {
      const lastCard = this.sortedCards[this.sortedCards.length - 1]
      let pos = 65535
      if (lastCard) pos = lastCard.pos + pos
      return pos
    }
  },
  methods: {
    ...mapActions([
      'UPDATE_CARD'
    ]),
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

      this.UPDATE_CARD({id: moveCardId, pos})
    },
    onDragoverCard({moveCardId, targetCardId}) {
      console.log('onDragoverCard', moveCardId, targetCardId)
    },
    onDragover(evt) {
      const {y} = getPosition(evt.target)
      const listY = getPosition(evt.currentTarget).y
      console.log('list: onDragover', y, listY)
    }
  }
}
</script>

<style>
ul {
  display: inline-block;
  vertical-align: top;
}
</style>
