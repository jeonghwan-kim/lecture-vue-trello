<template>
  <div class="list" :data-list-id="list.id" :data-list-pos="list.pos">
    <input v-if="isEditTitle" type="text" v-model="inputTitle" ref="inputTitle"
      @keyup.enter="onTitleSubmit" @blur="onTitleSubmit">
    <h3 v-else class="list-title" @click="onClickTitle">{{list.title}} {{list.pos}}</h3>
    
    <div class="card-list" :data-list-id="list.id">
      <div  v-show="!list.cards.length" class="empty-card-item"></div>
      <card-item v-for="card in list.cards" :key="`${list.id}-${card.pos}`" 
        :card="card" :boardId="list.boardId"></card-item> 
    </div>
    <div v-if="isAddCard">
      <add-card :pos="lastCardPos" :listId="list.id" @close="isAddCard = false"></add-card>      
    </div>
    <div>
      <a href="" @click.prevent="isAddCard = true">
        Add a card...
      </a>
    </div>
  </div>
</template>

<script>
import {card} from '../api'
import CardItem from './CardItem.vue'
import AddCard from './AddCard.vue'
import { mapActions } from 'vuex'

export default {
  components: { CardItem, AddCard },
  props: ['list'],
  data() {
    return {
      isAddCard: false,
      isEditTitle: false,
      inputTitle: ''
    }
  },
  created() {
    this.inputTitle = this.list.title
  },
  computed: {
    lastCardPos() {
      const lastCard = this.list.cards[this.list.cards.length - 1]
      let pos = 65535
      if (lastCard) pos = lastCard.pos + pos
      return pos
    }
  },
  methods: {
    ...mapActions([
      'UPDATE_LIST'
    ]),
    onClickTitle() {
      this.isEditTitle=true
      this.$nextTick(_=> this.$refs.inputTitle.focus())
    },
    onTitleSubmit() {
      this.inputTitle = this.inputTitle.trim()
      if (!this.inputTitle) return 
      const id = this.list.id
      const title = this.inputTitle

      if (title === this.list.title) return this.isEditTitle = false

      this.UPDATE_LIST({ id, title })
        .then(_=> (this.isEditTitle = false))
    },
  }
}
</script>

<style>
.list {
  background-color: green;
  margin-right: 10px;
  display: inline-block;
  vertical-align: top;
}
.card-list {
  width: 100%;
}
.empty-card-item   {
  height: 10px;
  width: 100%;
  background-color: rgba(0,0,0, 0);
}
.card-list {
  display: inline-block;
  vertical-align: top;
}
</style>
