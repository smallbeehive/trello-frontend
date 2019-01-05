<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <input class="form-control" type="text" v-model="inputTitle" ref="inputText">
      <!-- <button class="btn" :class="{'btn-success': valid}" type="submit" >Add Card</button> -->
      <button class="btn btn-success" :disabled="invalidInput" type="submit" >Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: ['listId'],
  data() {
    return {
      inputTitle: '',
    }
  },
  // watch: {
  //   inputTitle(v) {
  //     console.log(v)
  //     this.valid = v.trim().length > 0
  //   }
  // },
  computed: {
    invalidInput() {
      return !this.inputTitle.trim()
    }
  },
  mounted() {
    this.$refs.inputText.focus()
    this.setupClickOutside(this.$el)
    // this.$el하면 이 AddCard component의 element가 넘어가요.
    // 그걸 setupClickOutside에서 el로 받겠습니다.
    // 그래서 el에 DOM 함수중에 contains 함수가 있어요.
    // 이게 클릭한 element를 포함하고 있는지, 포함하고 있다면 현재 컴포넌트를
    // 클릭한 거기 때문에 아무 동작도 하지 않구요.
    // 그렇지 않을 경우에만 close event를 emit해서 List.vue component한테
    // 닫아달라고 요청하면 되겠죠.
  },
  methods: {
    ...mapActions([
      'ADD_CARD'
    ]),
    onSubmit() {
      if (this.invalidInput) return
      // 호출하기 전에 invalidInput이면 반환하도록 방어코드를 만듭니다.
      // 그리고 나서 action에 전달하기 위한 인자들을 가져오는데요
      // this에서 inputTitle을 가져옵니다. 입력한 값이죠.
      // 그리고 우리 ADD_CARD action을 호출할 때는 title 뿐만이 아니라
      // listId와 postion 정보도 가져오게 되있어요.
      // 제가 api를 만들때 postion 값은 optional 값으로 정했기 때문에 전달해주지 않아도 됩니다.
      // 대신에 listId는 반드시 전달해줘야되요.
      // 그래서 AddCard에서 listId도 받아와야 되는데 우리는 요거를
      // 부모 컴포넌트 List component 에서 받도록 할게요.

      const {inputTitle, listId} = this
      this.ADD_CARD({title: inputTitle, listId})
        .finally(() => this.inputTitle = '')
    },
    setupClickOutside(el) {
      document.querySelector('body').addEventListener('click', e => {
        // if (el.contains(e.currentTarget)) return
        if (el.contains(e.target)) return
        this.$emit('close')
      })
    }
  }
}
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>
