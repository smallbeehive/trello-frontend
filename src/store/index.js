import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api'
// 아 요부분이네요. 요렇게 해야죠.
// 왜냐면 api 부분에보면 board와 auth를 반환하고 있어요.
// 요렇게 api라는 닉네임으로 받아줘야 겠죠.

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAddBoard: false,
    boards: []
  },
  mutations: {
    SET_IS_ADD_BOARD (state, toggle) {
      state.isAddBoard = toggle
    },
    SET_BOARDS (state, boards) {
      state.boards = boards
    }
  },
  actions: {
    // context 객체를 처음에 받는데 저는 사용하지 않을거니까
    // _로 해놓고요. 입력은 어떤 객체로 받을건데
    // title이라는 키를 사용하겠습니다.
    ADD_BOARD (_, {title}) {
      return api.board.create(title)
    },
    FETCH_BOARDS ({commit}) {
      return api.board.fetch().then(data => {
        commit('SET_BOARDS', data.list)
      })
    }
  }
})

export default store
