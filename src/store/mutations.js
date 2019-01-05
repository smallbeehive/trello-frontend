import { setAuthInHeader } from '../api'

const mutations = {
  // 이제 로그인과 로그아웃 처리를 해야되는데
  // 로그인 같은 경우에는 요 상태(state token) 값을 저장하고
  // 로그아웃은 token 값을 삭제하는 기능을 하고 있어요.
  // 그래서 변이로 만들면 좋을 것 같습니다.
  LOGIN (state, token) {
    if (!token) return
    state.token = token
    localStorage.setItem('token', token)
    setAuthInHeader(token)
  },
  LOGOUT (state) {
    state.token = null
    delete localStorage.token
    setAuthInHeader(null)
  },
  // 이렇게 해서 변이를 추가했구요, 마지막으로
  // action을 추가해야겠죠. 로그아웃 같은 경우에는
  // 별도로 api 호출을 하지 않아요.
  // 반면에 로그인은 api 호출을 합니다.
  // 그래서 로그인에 대한 action만 만들어 보도록 하겠습니다.
  // 왜냐면 action은 api 호출과 같은 비동기 로직을 담당하는 역할을 하죠!

  SET_IS_ADD_BOARD (state, toggle) {
    state.isAddBoard = toggle
  },
  SET_BOARDS (state, boards) {
    state.boards = boards
  },
  SET_BOARD (state, board) {
    state.board = board
  },
  SET_CARD (state, card) {
    state.card = card
  }
}

export default mutations
