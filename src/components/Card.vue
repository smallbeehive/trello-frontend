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
  watch: {
    // '$route'(newVal, oldVal) {   // '$route' works!
    $route() {
      // this.cid = this.$route.params.cid
      // cid가 변경될 때마다 백엔드 api를 호출하는 로직.
      // 그래서 화면을 갱신하는 것이기 때문에 여기에다가
      // fetchData를 호출하는게 맞아요.
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
    // this.cid = this.$route.params.cid
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
