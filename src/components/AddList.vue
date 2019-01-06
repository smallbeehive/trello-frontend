<template>
  <div class="add-list">
    <input v-if="isAddList" type="text" class="form-control"
          v-model="inputTitle"
          ref="inputTitle"
          @blur="restore"
          @keyup.enter="onSubmitTitle">
    <a v-else href="" @click.prevent="onAddList">&plus; Add another list</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAddList: false,
      inputTitle: ''
    }
  },
  methods: {
    onAddList() {
      this.isAddList = true
      // this.$refs.inputTitle.focus()
      // [ 리스트 생성 ]
      // 요거는 렌더링 사이클에 의해 다음 틱에서 돌아야 하기 때문에
      // nextTick 함수 안에 넣어줍니다.
      this.$nextTick(_ => this.$refs.inputTitle.focus())
    },
    restore() {
      this.isAddList = false
      this.inpuTitle = ''
    },
    onSubmitTitle() {
      this.isAddList = false
      this.inpuTitle = ''
      console.log('enter')
    }
  }
}
</script>

<style>
.add-list {
  background-color: rgba(0,0,0, .1);
  padding: 12px;
  transition: all .3s
}
.add-list a {
  color: #ddd;
}
.add-list:hover,
.add-list:focus {
  background-color: rgba(0,0,0, .3);
}
</style>
