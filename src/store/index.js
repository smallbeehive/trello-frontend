import Vue from 'vue'
import Vuex from 'vuex'
// import * as api from '../api'
// 아 요부분이네요. 요렇게 해야죠.
// 왜냐면 api 부분에보면 board와 auth를 반환하고 있어요.
// 요렇게 api라는 닉네임으로 받아줘야 겠죠.
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  // 요번에는 getter를 하나 추가해보겠습니다.
  // 인증여부를 확인하는 getter에요.
  // 요거는 어디서 쓰냐면 router에서 쓰고 있어요.
  // localStorage의 토큰 값을 읽어서 인증여부를 체크하는 부분이
  // (router/index.js에) 있습니다.
  // " const isAuth = localStorage.getItem('token') "
  // 요거를 store의 getter라는 녀석으로 만들어볼게요.
  // getter는 기본적으로 state 변수를 인자로 받습니다. ...
  // getter는 일종의 Vue 컴포넌트의 computed 속성이랑 좀 유사한 점이 있어요.
  // 사용할 때는 isAuth 함수를 호출하는 것이 아니라 isAuth라는 변수처럼
  // 쓸 수 있어요.
  getters,
  mutations,
  actions
})

// 마지막으로 또 하나 해야할 건 어플리케이션이 구동되었을 때
// 브라우저 저장소를 확인하죠.
// 토큰이 있는지 없는지 localStorage에서 체크 합니다.
// store는 위에서 선언한 객체죠. store에 바로 commit 함수를
// 호출할 수 있어요.

// 기본적으로 어플리케이션이 구동할 때 localStorage에서
// token 정보를 읽어와 로그인 처리하는 요 로직을 만들었습니다.
const {token} = localStorage
store.commit('LOGIN', token)


export default store
