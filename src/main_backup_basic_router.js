import Vue from 'vue'
import App from './App.vue'

// Login 컴포넌트를 하나 제작 (템플릿만 가짐)
const Login = { template: '<div>Login Page</div>' }

// 요청 경로와 컴포넌트로 구성된 라우팅 맵(객체)을 자바스크립트 객체로 만들어 볼게요.
const routes = {
  '/': App,       // 루트 경로
  '/login': Login // 로그인 경로
}

new Vue({
  el: '#app',

  // Vue 인스턴스를 만들 때 화면을 그리는 render 함수를 변경해 볼거예요.
  // render: h => h(App)
  // 이 render 함수의 인자로 넘어온 h함수를 통해서 App이라는 컴포넌트를 그리고 있는데
  // 저는 그것이 아니라 경로에 따라서 컴포넌트를 다르게 반환할거예요.
  // this.VueComponent라는 computed 속성을 인자로 넣어주겠습니다.
  computed: {
    VueComponent() {
      return routes[window.location.pathname] ||
        { template: '<div>Page not found</div>' }
    }
  },
  render(h) {
    return h(this.VueComponent)
  }
})
