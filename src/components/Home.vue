<template>
    <div>
      Home
      <div>
        Board List:
        <div v-if="loading">Loading...</div>
        <div v-else>Api result:
          <pre>{{apiRes}}</pre>
          <pre>{{error}}</pre>
        </div>
        <ul>
          <li>
            <router-link to="/b/1">Board 1</router-link>
          </li>
          <li>
            <router-link to="/b/2">Board 2</router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loading: false,
      apiRes: '',
      error: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true

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
      axios.get('http://localhost:3000/health')
        .then(res => {
          this.apiRes = res.data
        })
        .catch(res => {
          this.error = res.response.data
        })
        // then과 catch과 수행된 다음에 실행될 거예요.
        // 그러기 때문에 공통으로 수행될 로직을 넣음
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
</style>
