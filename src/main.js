import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// Vue의 use라는 함수를 이용해서 추가해야되요. 이걸 미들웨어라고 하는데 이렇게 추가해줘야 사용할 수 있어요.
Vue.use(VueRouter)

// Login 컴포넌트를 하나 제작 (템플릿만 가짐)
const Login = { template: '<div>Login Page</div>' }
const NotFound = { template: '<div>Page not found</div>' }

// const routes = [
//   { path: '/', component: App },
//   { path: '/login', component: Login }
// ]

const router = new VueRouter({
  // routes // short for `routes: routes`
  routes: [
    // 라우터는 우선순위에 의해서 선언된 순서대로 매칭이 됩니다.
    // 위 두개 경로의 url이 매칭되지 않으면 마지막 규칙이 적용되는데 Not found가 뜰거에요.
    { path: '/', component: App },
    { path: '/login', component: Login },
    { path: '*', component: NotFound}
  ],
  // 그런데 특이하게 #가 붙었죠. 그것은 브라우저에서 라우팅할 때 hashback 모드라는 것이
  // 동작하고 있습니다. 요거는 브라우저에 history api가 없을 경우에는 hashback 모드를 사용했는데요
  // 저희 chrome 같은 경우에는 history api가 있기 때문에 hashback 모드가 아니라
  // history 모드를 사용하겠습니다.
  mode: 'history',
})

new Vue({
  el: '#app',
  router,
  // https://router.vuejs.org/#introduction
  // 예제와는 조금 다르게 필요한 부분이 있는데, 예제에서는 <router-view></router-view>라는 곳에
  // 컴포넌트가 렌더링되는데요
  // 여기서는 render라는 함수를 통해서 렌더링되는게 좀 달라요.
  // 그래서 요 부분을 좀 바꿔볼게요.
  // 예전처럼 h함수를 받는 렌더함수로 바꾸구요. 이 렌더링하는 h함수안에 컴포넌트를 넣어주겠습니다.
  // 이렇게 넣어주면 요청 경로에 따라서 아래 '<router-view></router-view>' 부분이
  // App 컴포넌트가 갈 수도 있고, Login 컴포넌트가 갈 수도 있어요.
  render: h => h({template: '<router-view></router-view>'})
})
