<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
    <!-- router-view를 사용하게 되면 router-view를 선안한 위 아래
    header를 놓거나 footer를 놔서 앱에서 항상 보여할 부분들을
    App.vue에 선언하고 routing 경로에 따라 바꿔야 할 부분은
    router-view를 출력될 수 있습니다. -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: { Navbar },
  data () {
    return {

    }
  }
}
</script>

<style>
</style>
