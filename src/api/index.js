import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:8000'
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
  axios.defaults.headers.common['Authorization'] = token ? `Token ${token}` : null;
}

// console.log('hi! this is from src/api/index.js')

// const {'token' : token} = localStorage
// if (token) setAuthInHeader(token)

// 1) my explanaton
// When redirected, set token data into axios header automatically

// 2) [ Vuex 적용 - 인증 1 ]
// 우선 어플리케이션이 구동되면 요 api를 담당하는 부분에서 로직이 하나 돕니다.
// 그거는 localStorage에서 토큰 정보를 읽어오고 ajax를 보내기 위한
// requst 헤더에 토큰을 저장하는 역할을 합니다.

// 3) [ Vuex 적용 - 인증 1 ] 댓글
// 확인할 수 있는 가장 좋은 부분은 각 코드 근처에 console.log()를 찍어 보는 것입니다.
// 전자는 JS코드가 로딩될때 딱 한번 먼저 실행됩니다.
// 후자는 이후에 라우팅이 동작할때마다 beforeEnter 훅에서 실행됩니다.

// 4) [ Vuex 적용 - 인증 2 ]
// 어플리케이션이 구동할 때 localStorage를 읽어서 요청헤더를 세팅하는 부분이 있죠.
// 요부분은 삭제해도 되요. 왜냐면 store에서 그 일을 대신하고 있죠.
// 그래서 더이상 api/index.js는 로그인 관련된 일은 하지 않아요.

export const board = {
  fetch(id) {
    return id ? request('get', `/board/${id}`) : request('get', '/board')
  },
  create(title) {
    return request('post', '/board/', {title})
  },
  destroy(id) {
    return request('delete', `/board/${id}/`)
  },
  update(id, payload) {
    return request('put', `/board/${id}/`, payload)
  }
}

export const list = {
  create(payload) {
    return request('post', '/list/', payload)
  },
  update(id, payload) {
    return request('put', `/list/${id}/`, payload)
  },
  destroy(id) {
    return request('delete', `/list/${id}/`)
  }
}

export const card = {
  create(title, listId, pos) {
    return request('post', '/card/', {title, listId, pos})
  },
  fetch(id) {
    return request('get', `/card/${id}/`)
  },
  update(id, payload) {
    return request('put', `/card/${id}/`, payload)
  },
  destroy(id) {
    return request('delete', `/card/${id}/`)
  }
}

export const auth = {
  login(email, password) {
    // return request('post', '/login', {'email': email, 'password': password})
    return request('post', '/user/login/', {email, password})
  }
}
