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
      // this.$emit('submit', this.input)

      // [ 액션(Action) ]
      // 그리고 이 액션을 호출하려면 스토어의 dispatch 함수를 써서
      // 해야겠죠. 저는 AddBoard 부분에 가서 직접 호출하도록 하겠습니다.
      // AddBoard 같은 경우에는 뭔가 입력이 다 끝나고 엔터를 치거나
      // save 버튼을 클릭하면 호출하는 부분이에요.
      // 여기서 상위로 submit 이벤트를 발생했는데 그것이 아니라
      // 저는 바로 actions 함수를 호출할게요.
      // store의 dispatch 함수를 호출하고 ADD_BOARD라는 액션함수를
      // 호출하게끔 합니다. 그리고 여기서 페이로드를 전달해주는데
      // title은 this.input을 전달해주죠.
      // submit 이벤트를 발생시킬 때 input을 전달하지 않고 그냥
      // submit 이벤트만 발생을 할게요.
      this.$store.dispatch('ADD_BOARD', {title: this.input})
      this.$emit('submit')
    }
  }
}
</script>

<style>

</style>
