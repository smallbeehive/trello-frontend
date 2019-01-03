<template>
    <div>
      Board
      <div>bid: {{bid}}</div>
      <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
      <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
      <hr />
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      bid: 0
    }
  },
  created() {
    // console.log(this.$route.params.bid)
    // 이렇게 볼 수 있는 이유는 router를 설정할 때
    // Vue의 use라는 함수를 통해서 VueRouter를
    // 미들웨어 식으로 추가.
    // 그래서 Vue를 통해서 만든 Vue 인스턴스는
    // $route라는 변수를 통해서 router 정보에 접근할 수
    // 있는 겁니다.
    // 그러면 이 정보를 BoardComponent 화면에 출력해 보겠습니다.
    this.bid = this.$route.params.bid
  }
}
</script>

<style>
</style>
