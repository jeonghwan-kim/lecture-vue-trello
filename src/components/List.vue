<template>
  <ul class="list">
    <li>
      <h2 class="list-title">{{list.title}}</h2>
    </li>
    <li v-for="(card, i) in sortedCards" :key="i" >
      <card-item :card="card" :boardId="list.boardId" 
        @dropCard="onDropCard"
        @dragoverCard="onDragoverCard"></card-item> 
    </li>
    <li>
      <div v-show="isAddCard">
        <form @submit.prevent="onSubmitNewCard">
          <div>
            <input type="text" v-model="inputCardTitle" ref="inputCardTitle">
          </div>
          <div>
            <button type="submit" class="btn btn-success" :disabled="invalidInput">Add</button>
            <a href="" @click.prevent="onCancelAddCard"><i class="fas fa-times"></i></a>
          </div>
        </form>
      </div>
    </li>
    <li>
      <a href="" class="text-grey" @click.prevent="onClickAddCard">Add a card...</a>
    </li>
  </ul>
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
      if (lastCard) pos = lastCard.pos + pos

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
  width: 270px;
  padding: 0 0 16px;
  margin-right: 10px;
  border: none;
  border-radius: 3px;
  background-color: #e2e4e6;
  vertical-align: top;
}
.list li {
  padding: 10px 15px 0;
}
.list li:first-child {
  margin: 0;
}
.list li:last-child {
  
}
.list-title {
  font-size: 100%;
}
</style>
