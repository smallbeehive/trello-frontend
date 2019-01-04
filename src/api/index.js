import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
  // this.$router.replace('/login')

  // router.push('/login')
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
  // -> src/router/index.js에서 네비게이션 가드를 통해 모든 라우터에 적용해서
  //    위 코드는 필요 없음.
  // -> 이 아닌듯..
}

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data
  }).then(result => result.data)
    .catch(result => {
      // const {'status' : status} = result.response
      const {status} = result.response
      // if (status === UNAUTHORIZED) return onUnauthorized()
      if (status === UNAUTHORIZED) onUnauthorized()

      // 처리 되지 않는 401 이외의 에러들은 throw
      // 나중에 필요하면 추가로 로직을 개발하도록 함.
      // throw Error(result)
      throw result.response
    })
}

export const board = {
  fetch() {
    return request('get', '/boards')
  }
}

export const auth = {
  login(email, password) {
    // return request('post', '/login', {'email': email, 'password': password})
    return request('post', '/login', {email, password})
  }
}
