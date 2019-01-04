<template>
    <div>
      Home
      <div>
        Board List:
        <div v-if="loading">Loading...</div>
        <div v-else>
          <div v-for="b in boards" :key="b.id">
            <pre>{{b}}</pre>
          </div>
        </div>
        <!-- <ul>
          <li>
            <router-link to="/b/1">Board 1</router-link>
          </li>
          <li>
            <router-link to="/b/2">Board 2</router-link>
          </li>
        </ul> -->
      </div>
    </div>
</template>

<script>
// import axios from 'axios'
import {board} from '../api'
// import router from '../router'

export default {
  data() {
    return {
      loading: false,
      boards: [],
      // error: ''  // 리다이렉트 때문에 더이상 쓰지 않음
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true

      // 1) XMLHttpRequest
      // const req = new XMLHttpRequest()
      // req.open('GET', 'http://localhost:3000/health')
      // req.send()
      // req.addEventListener('load', () => {
      //   this.loading = false
      //   // console.log(req)
      //   this.apiRes = {
      //     status: req.status,
      //     statusText: req.statusText,
      //     response: JSON.parse(req.response)
      //   }
      // })

      // 2) axios directly
      // axios.get('http://localhost:3000/boards')
      //   .then(res => {
      //     this.boards = res.data
      //   })
      //   .catch(err => {
      //     // this.error =  err.response.data
      //     // 에러가 발생한다라는 것은 요청했을 때 토큰 정보가 없거나 잘못되서
      //     // Unauthorized 라는 401 에러코드가 응답이 될 겁니다.
      //     // 따라서 여기서는 로그인 페이지로 이동을 해야겠죠.
      //     // 그때 사용할 수 있는게 Vue rotuer입니다.
      //     // this.$router라는 객체를 통해서 쓸 수 있어요.
      //     // router에 replace라는 함수를 통해서 경로를 이동시킬 수 있어요.
      //     this.$router.replace('/login')
      //     // router.push('/login')
      //   })
      //   // then과 catch과 수행된 다음에 실행될 거예요.
      //   // 그러기 때문에 공통으로 수행될 로직을 넣음
      //   .finally(() => {
      //     this.loading = false
      //   })

      board.fetch()
        .then(data => {
          this.boards = data
        })
        // .finally(() => {
        .finally(_=> {
          this.loading = false
        })
    }
  }
}
</script>

<style>
</style>
