<template>
    <div>
      Card
      <div v-if="loading">loading card...</div>
      <div v-else>
        <div>cid: {{cid}}</div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      cid: 0,
      loading: false
    }
  },
  // watch: {
  //   // '$route'(newVal, oldVal) {   // '$route' works!
  //   $route() {
  //     // this.cid = this.$route.params.cid
  //     // cid가 변경될 때마다 백엔드 api를 호출하는 로직.
  //     // 그래서 화면을 갱신하는 것이기 때문에 여기에다가
  //     // fetchData를 호출하는게 맞아요.
  //     this.fetchData()
  //   }
  // },
  // created() {
  //   this.fetchData()
  //   // this.cid = this.$route.params.cid
  // },
  watch: {
    // 좀 더 코드를 개선해볼게요. watch를 설정할 때
    // 이렇게도 할 수 있어요.
    // 함수가 아닌 객체를 설정할 수 있는데
    // handler를 fetchData라는 문자열로 주고요
    // 그렇게 되면 이 fetchData를 실행하는 거예요.
    // 그리고 immediate라는 boolean값이 있는데
    // true를 주면 바로 즉시 시행하는 거예요.
    // created 안의 훅과 중복이죠.

    // $route: {
    '$route': {
      handler: 'fetchData',
      immediate: true
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {
        this.cid = this.$route.params.cid
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style>
</style>
