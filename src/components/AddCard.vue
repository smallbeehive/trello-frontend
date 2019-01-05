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
export default {
  data() {
    return {
      inputTitle: '',
      valid: ''
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
    onSubmit() {
      console.log('submit')
    },
    setupClickOutside(el) {
      document.querySelector('body').addEventListener('click', e => {
        // if (el.contains(e.target)) return
        if (el.contains(e.currentTarget)) return
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
