import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from '../App.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import NotFound from '../components/NotFound.vue'

// Vue의 use라는 함수를 이용해서 추가해야되요. 이걸 미들웨어라고 하는데 이렇게 추가해줘야 사용할 수 있어요.
Vue.use(VueRouter)

// Login 컴포넌트를 하나 제작 (템플릿만 가짐)
// const Login = { template: '<div>Login Page</div>' }
// const NotFound = { template: '<div>Page not found</div>' }

// const routes = [
//   { path: '/', component: App },
//   { path: '/login', component: Login }
// ]

const router = new VueRouter({
  // routes // short for `routes: routes`
  routes: [
    // 라우터는 우선순위에 의해서 선언된 순서대로 매칭이 됩니다.
    // 위 두개 경로의 url이 매칭되지 않으면 마지막 규칙이 적용되는데 Not found가 뜰거에요.
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/b/:bid', component: Board },
    { path: '*', component: NotFound}
  ],
  // 그런데 특이하게 #가 붙었죠. 그것은 브라우저에서 라우팅할 때 hashback 모드라는 것이
  // 동작하고 있습니다. 요거는 브라우저에 history api가 없을 경우에는 hashback 모드를 사용했는데요
  // 저희 chrome 같은 경우에는 history api가 있기 때문에 hashback 모드가 아니라
  // history 모드를 사용하겠습니다.
  mode: 'history',
})

export default router
