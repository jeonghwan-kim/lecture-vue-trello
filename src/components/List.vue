<template>
  <ul class="list" :data-list-id="list.id">
    <li>
      <h3>{{list.title}}</h3>
    </li>
    <li v-for="card in list.cards" :key="`${list.id}-${card.pos}`" >
      <card-item :card="card" :boardId="list.boardId"></card-item> 
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

export default {
  components: { CardItem, AddCard },
  props: ['list'],
  data() {
    return {
      isAddCard: false
    }
  },
  computed: {
    lastCardPos() {
      const lastCard = this.list.cards[this.list.cards.length - 1]
      let pos = 65535
      if (lastCard) pos = lastCard.pos + pos
      return pos
    }
  },
}
</script>

<style>
.list {
  background-color: green;
  margin-right: 10px;
}
ul {
  display: inline-block;
  vertical-align: top;
}
</style>
