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
  },
  DELETE_BOARD (_, {id}) {
    return api.board.destroy(id)
  },
  UPDATE_BOARD ({dispatch, state}, {id, title, bgColor}) {
    return api.board.update(id, {title, bgColor})
      .then(_ => dispatch('FETCH_BOARD', {id: state.board.id}))
  },

  ADD_LIST ({dispatch, state}, {title, boardId, pos}) {
    return api.list.create({title, boardId, pos})
      .then(_ => dispatch('FETCH_BOARD', {id: state.board.id}))
  },

  // ADD_CARD (context, {title, listId, pos) {
  ADD_CARD ({dispatch, state}, {title, listId, pos}) {
    return api.card.create(title, listId, pos)
    // 그래서 여기서 api를 성공해서 카드 추가를 완료했으면
    // 그 결과가 화면에 뿌려져야 될거예요.
    // 화면에 뿌려질려면 다시한번 보드 조회 api를 호출하는게 좋을 것 같아요.
      .then(_ => dispatch('FETCH_BOARD', {id: state.board.id}))
      // 이 context의 dispatch 함수를 해체 문법으로 가져오겠습니다.
      // 그리고 FETCH_BOARD를 호출하도록 할게요.
      // 그런데 이 FETCH_BOARD는 두번째 인자로 아이디를 받고 있습니다.
      // id는 board의 아이디를 받게 되겠죠.
      // 이 board는 우리가 상태로 관리하고 있어요. state.js를 보면
      // board라는 객체를 관리하고 있죠. 이게 선택된 board 객체입니다.
      // state도 가져와야 되는데 이것도 context 객체에서 가져옵니다.
  },
  FETCH_CARD ({commit}, {id}) {
    return api.card.fetch(id).then(data => {
      // 그런 다음에 하나 할 것은 이 카드 정보를 받았으면
      // 카드 정보도 전역상태에 넣어주는게 편리할 것 같아요.
      // 그래서 data를 받으면 카드를 우리 상태에 추가하기 위해서
      // 변이함수를 호출하겠습니다. SET_CARD 라고 할게요.
      commit('SET_CARD', data.item)
    })
  },
  UPDATE_CARD ({dispatch, state}, {id, title, description, pos, listId}) {
    return api.card.update(id, {title, description, pos, listId})
    // 이게 업데이트 카드를 하고 나면 업데이트 된 정보가 또 화면에 뿌려줘야 겠죠.
    // 화면을 갱신하려면 보드 정보를 FETCH해 오면 될 것 같아요.
      .then(_ => dispatch('FETCH_BOARD', {id: state.board.id}))
  },
  DELETE_CARD ({dispatch, state}, {id}) {
    return api.card.destroy(id)
      .then(_ => dispatch('FETCH_BOARD', {id: state.board.id}))
  }
}

export default actions
