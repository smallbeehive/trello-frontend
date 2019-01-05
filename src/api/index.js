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

export const setAuthInHeader = token => {
  // token 정보를 받아서 axios library 안에다가 기능을 추가할 건데
  // 모든 request를 날리기전에 헤더값을 토큰 정보로 설정하는 역할을 하는 겁니다.
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

// console.log('hi! this is from src/api/index.js')

// When redirected, set token data into axios header automatically
// const {token} = localStorage
const {'token' : token} = localStorage
if (token) setAuthInHeader(token)
// [ Vuex 적용 - 인증 1 ]
// 우선 어플리케이션이 구동되면 요 api를 담당하는 부분에서 로직이 하나 돕니다.
// 그거는 localStorage에서 토큰 정보를 읽어오고 ajax를 보내기 위한
// requst 헤더에 토큰을 저장하는 역할을 합니다.

export const board = {
  fetch() {
    return request('get', '/boards')
  },
  create(title) {
    return request('post', '/boards', {title})
  }
}

export const auth = {
  login(email, password) {
    // return request('post', '/login', {'email': email, 'password': password})
    return request('post', '/login', {email, password})
  }
}
