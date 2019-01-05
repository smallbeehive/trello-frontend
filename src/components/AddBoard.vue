<template>
  <Modal>
    <div slot="header">
      <h2>
        Create new board
        <a href="" class="modal-default-button"
          @click.prevent="SET_IS_ADD_BOARD(false)">&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form"
        @submit.prevent="addBoard">
        <input class="form-control" type="text" v-model="input" ref="input">
      </form>
    </div>
    <div slot="footer">
      <button class="btn" :class="{'btn-success': valid}" type="submit"
        form="add-board-form" :disabled="!valid">
        Create Board</button>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import {mapMutations} from 'vuex'

export default {
  components: {
    Modal
  },
  data() {
    return {
      input: '',
      valid: false
    }
  },
  watch: {
    input(v) {
      this.valid = v.trim().length > 0
    }
  },
  // AddBoard가 상위 부모컴포넌트에 마운트 됬을 때
  // focus를 입력필드로 커서를 옮기기 위한 코드입니다.
  mounted() {
    this.$refs.input.focus()
  },
  methods: {
    ...mapMutations([
      'SET_IS_ADD_BOARD'
    ]),
    // close() {
    //   this.$emit('close')
    // },
    addBoard() {
      // this.$emit('close')
      this.SET_IS_ADD_BOARD(false)
      this.$emit('submit', this.input)
    }
  }
}
</script>

<style>

</style>
