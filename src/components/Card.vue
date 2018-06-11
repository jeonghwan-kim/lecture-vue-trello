<template>
  <div class="card">
    <button @click="onClickClose">X</button>
    <h2>
      <input type="text" :value="card.title" :readonly="!toggleTitle"
        @click.prevent="toggleTitle=!toggleTitle" @blur="onBlurTitle"
        ref="inputTitle">
    </h2>
    <div>
      <h3>Description</h3>
      <textarea cols="30" rows="10" placeholder="Add a more detailed description..."
        :readonly="!toggleDesc"
        @click.prevent="toggleDesc=!toggleDesc" @blur="onBlurInputDesc" 
        ref="inputDesc" :value="card.description"></textarea>
    </div>
  </div>  
</template>

<script>
import {card} from '../api'

export default {
  props: ['boardId'],
  data() {
    return {
      card: {},
      toggleTitle: false,
      toggleDesc: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      card.fetch(this.$route.params.cid).then(({ item }) => {
        this.card = item
      }).catch(err => {
        console.log(err)
      })
    },
    onClickClose() {
      this.$router.push(`/board/${this.boardId}`)
    },
    onBlurTitle() {
      this.toggleTitle = !this.toggleTitle
      const title = this.$refs.inputTitle.value.trim()
      if (!title) return 
      
      card.update(this.card.id, {title}).then(data => {
        this.fetchData()
      }).catch(err => {
        console.log(err)
      })
    },
    onBlurInputDesc() {
      this.toggleDesc = !this.toggleDesc
      const description = this.$refs.inputDesc.value.trim()
      if (!description) return 

      card.update(this.card.id, {description}).then(_=> {
        this.fetchData()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.card {
  border: solid 1px gray;
}
</style>
