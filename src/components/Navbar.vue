<!-- 네비게이션 역할을 하는 부분은 Navbar라는 컴포넌트로 분리해 낼거예요. -->
<template>
  <nav class="header">
    <div class="header-logo">
      <router-link to="/">Home</router-link>
    </div>
    <div class="header-auth">
      <a href="" v-if="isAuth" @click.prevent="logout">Logout</a>
      <router-link v-else to="/login">Login</router-link>
    </div>
  </nav>
</template>

<script>
// import {setAuthInHeader} from '../api'
// 여기서 더이상 api 호출은 하지 않으니까 삭제하구요.
import {mapState, mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    // isAuth() {
    //   return !!localStorage.getItem('token')
    // }
    ...mapGetters([
      'isAuth'
    ]),
    ...mapState({
      navbarColor: 'navbarColor',
      bodyColor: 'bodyColor'
    })
  },
  // [ 색상 입히기 ]
  // 그런데 요 화면이 container 부분이 변경되지 않고 있죠.
  // SET_THEME mutation으로 가보면 여기는 state값을 변경만 하고 있어요.
  // 실제로 이 컬러값을 DOM에 적용하는 코드는 Navbar component의
  // updateTheme method가 수행하고 있죠.
  // 그렇기 때문에 요 bodyColor나 navbarColor state 값이 변경됬을 때
  // 요 Navbar component의 updateTheme이라는 메서드를 호출해야겠죠.
  // 그럴려면 우리가 watch를 추가하겠습니다.
  // bodyColor로 하겠습니다. 엄밀히말하면 bodyColor죠.
  // bodyColor를 감시하고 있다가 변경이 되면 updateTheme이 호출되도록 하겠습니다.
  watch: {
    'bodyColor': 'updateTheme'
  },
  mounted() {
    this.updateTheme()
  },
  methods: {
    ...mapMutations([
      'LOGOUT'
    ]),
    logout() {
      // delete localStorage.token
      // setAuthInHeader(null)
      this.LOGOUT()
      this.$router.push('/login')
    },
    // (Homoe.vue의 created()에서 this.SET_THEME()을 호출해도 변화가 없음.)
    // 왜냐하면 이 Home component 에서는 단순히 SET_THEME라는 mutation을 호출했고,
    // mutation에서 상태값만 저장했기 때문이에요.
    // 그러면 이 상태값이 변할 때 요 상태값을 참조해서 색상을 변화시켜 줘야겠죠.
    // 고거 같은 경우에는 요 Navbar component가 있어요.
    // Navbar component는 보드에 들어가거나 홈에 나오거나 둘다 사용하고 있는
    // component이기 때문에 여기에다가 테마 로직을 추가하면 되겠습니다.
    updateTheme() {
      // 이 updateTheme에서 색상을 변경하려면 관련된 element들을 가져와야 겠죠.
      // 먼저 이 Navbar부터 색상을 변경해보도록 하겠습니다.

      // 1) Navbar
      // this의 $el하면 지금 navbar element를 가져온거예요.
      this.$el.style.backgroundColor = this.navbarColor

      // 2) Body
      // 그리고 또 남은것이 아래 부분을 또 세팅해줘야 하는데
      // 고거는 함 보죠. 요 컨테이너(.containe) 부분이에요.
      const container = document.querySelector('.container')
      if (container) container.style.backgroundColor = this.bodyColor
    }
  }
}
</script>

<style>
.header {
  flex: none;
  background-color: rgba(0,0,0,.15);
  height: 32px;
  padding: 4px;
}
.header a {
  display: block;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  color: rgba(255,255,255,.5);
}
.header-logo {
  position: absolute;
  left: 50%;
  top: 7px;
  margin-left: -30px;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
}
.header-logo a:hover,
.header-logo a:focus {
  color: rgba(255,255,255,.9);
}
.header-auth {
  position: absolute;
  right: 15px;
  top: 5px;
}
.header-auth a {
  border-radius: 2px;
  padding: 0 10px;
  background-color: rgba(255,255,255, .5);
  color: white;
  transition: all .3s;
}
.header-auth a:hover,
.header-auth a:focus {
  background-color: rgba(255,255,255, .3);
}
</style>
