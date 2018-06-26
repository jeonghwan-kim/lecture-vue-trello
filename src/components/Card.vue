<template>
  <modal>
    <div slot="header">
      <button @click="onClickClose">X</button>
      <h2>
        <input type="text" :value="card.title" :readonly="!toggleTitle"
          @click.prevent="toggleTitle=!toggleTitle" @blur="onBlurTitle"
          ref="inputTitle">
      </h2>
    </div>
    <div slot="body">
      <h3>Description</h3>
      <textarea cols="30" rows="10" placeholder="Add a more detailed description..."
        :readonly="!toggleDesc"
        @click.prevent="toggleDesc=!toggleDesc" @blur="onBlurInputDesc" 
        ref="inputDesc" :value="card.description"></textarea>
    </div>
    <div slot="footer"></div>
  </modal>  
</template>

<script>
import {card} from '../api'
import Modal from './Modal.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: { Modal },
  props: ['boardId'],
  data() {
    return {
      toggleTitle: false,
      toggleDesc: false
    }
  },
  computed: {
    ...mapState({
      card: 'card'
    })
  },
  created() {
    this.FETCH_CARD(this.$route.params.cid)
  },
  methods: {
    ...mapActions(['FETCH_CARD', 'UPDATE_CARD']),
    onClickClose() {
      this.$router.push(`/board/${this.boardId}`)
    },
    onBlurTitle() {
      this.toggleTitle = !this.toggleTitle
      const title = this.$refs.inputTitle.value.trim()
      if (!title) return 
      this.UPDATE_CARD({id: this.card.id, title})
    },
    onBlurInputDesc() {
      this.toggleDesc = !this.toggleDesc
      const description = this.$refs.inputDesc.value.trim()
      if (!description) return 
      this.UPDATE_CARD({id: this.card.id, description})
    }
  }
}
</script>

