import Vue from 'vue'
import router from './router' // .js는 빼도 되구요, index도 빼도 됩니다.
                              // router 폴더만 명시를 해주면 그 아래있는 index.js를
                              // 가져오게 됩니다.

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
