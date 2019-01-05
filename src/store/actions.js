import * as api from '../api'

const actions = {
  // context 객체를 처음에 받는데 저는 사용하지 않을거니까
  // _로 해놓고요. 입력은 어떤 객체로 받을건데
  // title이라는 키를 사용하겠습니다.
  ADD_BOARD (_, {title}) {
    // return api.board.create(title)
    return api.board.create(title).then(data => data.item)
  },
  FETCH_BOARDS ({commit}) {
    return api.board.fetch().then(data => {
      commit('SET_BOARDS', data.list)
    })
  },
  LOGIN ({commit}, {email, password}) {
    return api.auth.login(email, password)
      .then(({accessToken}) => commit('LOGIN', accessToken))
  }
}

export default actions
