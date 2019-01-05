import * as api from '../api'

const actions = {
  // context 객체를 처음에 받는데 저는 사용하지 않을거니까
  // _로 해놓고요. 입력은 어떤 객체로 받을건데
  // title이라는 키를 사용하겠습니다.
  LOGIN ({commit}, {email, password}) {
    return api.auth.login(email, password)
      .then(({accessToken}) => commit('LOGIN', accessToken))
  },
  ADD_BOARD (_, {title}) {
    // return api.board.create(title)
    return api.board.create(title).then(data => data.item)
  },
  FETCH_BOARDS ({commit}) {
    return api.board.fetch().then(data => {
      commit('SET_BOARDS', data.list)
    })
  },
  FETCH_BOARD ({commit}, {id}) {
    // board 중에 fetch라는 함수가 있어요. 요 fetch 함수는
    // 보드 목록에서 쓰고 있죠. 전체 목록을 전달해주는건데
    // 얘를 약간 변경할게요.
    // 우리가 받은 아이디를 전달해주면 그 해당하는 api를 호출하는 함수라고
    // 가정하고 만들겠습니다.
    return api.board.fetch(id).then(data => {
      commit('SET_BOARD', data.item)
    })
  }
}

export default actions
