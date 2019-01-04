import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from '../App.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
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

const requireAuth = (to, from, next) => {
  // 토큰 정보가 있으면 문자열이 저장될 것이고 없으면 undefined 값이
  // 저장이 될거예요.
  const isAuth = localStorage.getItem('token')
  // 그리고 또 하나 여기서 추가적으로 할게 loginPath를 정해줍니다.
  // 기본적으로는 이게 로그인 경로에요.
  // 그런데 로그인 페이지에 갔다가 로그인이 완료한 다음에 현재 페이지로 돌아와야 되잖아요.
  // 그래서 쿼리스트링으로 리턴패쓰라는 정보를 전달해줍니다.
  // 요거는 로그인 페이지에서 로그인 완료후에 이쪽으로 리다이렉트해달라는 그런 의도에요.
  // 여기 현재 경로는 파라미터중에 to 라는 곳에 들어있어요.
  // 그래서 to.path를 넣어주면 되구요.
  // 그리고 얘는 쿼리 문자열이기 때문에 인코딩 해줘야되요.
  // encodeURIComponent라는 함수로 아스키 문자열로 변경을 해줘야 되요.
  // 만약에 isAuth 값이 있으면, 즉 로그인이 되서 토큰 값이 있으면 next 함수를 호출해요.
  // next 함수를 호출해서 라우팅 로직을 계속 이어서 수행하는 거구요.
  // 그렇지 않을 경우에는 loginPath 경로로 리다이렉트 해버리는거죠.
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  isAuth ? next() : next(loginPath)
}

const router = new VueRouter({
  // routes // short for `routes: routes`
  routes: [
    // 라우터는 우선순위에 의해서 선언된 순서대로 매칭이 됩니다.
    // 위 두개 경로의 url이 매칭되지 않으면 마지막 규칙이 적용되는데 Not found가 뜰거에요.
    {
      path: '/',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/b/:bid',
      component: Board,
      beforeEnter: requireAuth,
      children: [
        {
          path: 'c/:cid',
          component: Card,
          beforeEnter: requireAuth
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  // 그런데 특이하게 #가 붙었죠. 그것은 브라우저에서 라우팅할 때 hashback 모드라는 것이
  // 동작하고 있습니다. 요거는 브라우저에 history api가 없을 경우에는 hashback 모드를 사용했는데요
  // 저희 chrome 같은 경우에는 history api가 있기 때문에 hashback 모드가 아니라
  // history 모드를 사용하겠습니다.
  mode: 'history',
})

export default router
