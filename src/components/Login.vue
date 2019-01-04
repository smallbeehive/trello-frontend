<template>
  <div class="login">
    <h2>Log in to Trello</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input class="form-control" type="text" name="email"
          v-model="email" autofocus placeholder="e.g., test@test.com" />
      </div>
      <div>
        <label for="password">Passwrod</label>
        <input class="form-control" type="password"
          v-model="password" placeholder="123123" />
      </div>
      <button  class="btn" :class="{'btn-success': !invalidForm}" type="submit"
        :disabled="invalidForm">Log In</button>
    </form>
    <p class="error" v-if="error">{{error}}</p>
  </div>
</template>

<script>
import {auth, setAuthInHeader} from '../api'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      rPath: ''
    }
  },
  computed: {
    invalidForm() {
      return !this.email || !this.password
    }
  },
  created() {
    // 이제 리턴 경로로, 즉 요 rPath라는 곳으로 리다이렉트 할 필요가 있어요.
    // 리다이렉트 같은 경우에는 url을 통해서 가져올 수 있어요.
    // 그래서 저는 컴포넌트가 생성될 때 created죠.
    // 컴포넌트가 생성될 때 rPath라는 곳에다가 저장을 할거예요.
    // 라우트 정보는 $route로 접속할 수 있구요 쿼리 문자열은 query로 접속할 수 있어요.
    // rPath를 가져옵니다. 아무것도 없을 경우에는 기본적으로 메인 경로로 이동하도록 했습니다.
    this.rPath = this.$route.query.rPath || '/'
  },
  methods: {
    onSubmit() {
      // console.log(this.email, this.password)
      auth.login(this.email, this.password)
        .then(data => {
          // console.log(data)
          localStorage.setItem('token', data.accessToken)
          setAuthInHeader(data.accessToken)
          // console.log(this.rPath)
          this.$router.push(this.rPath)
        })
        .catch(err => {
          // console.log(err)
          this.error = err.data.error
        })
    }
  }
}
</script>

<style>
.login {
  width: 400px;
  margin: 0 auto;
}
.error {
  color: #f00;
}

</style>
