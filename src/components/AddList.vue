<template>
  <div class="add-list">
    <input v-if="isAddList" type="text" class="form-control"
          v-model="inputTitle"
          ref="inputTitle">
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
    }
  }
}
</script>

<style>

</style>
