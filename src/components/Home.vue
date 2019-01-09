<template>
  <!-- <div>
    Home
    <div>
      Board List:
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="b in boards" :key="b.id">
          <pre>{{b}}</pre>
        </div>
      </div>
    </div>
  </div> -->
  <div>
    <!-- <div v-if="loading">Loading...</div> -->

    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div class="board-item" v-for="b in boards" :key="b.id"
        :data-bgcolor="b.bgColor" ref="boardItem">
      <!-- <div class="board-item" v-for="b in boards" :key="b.id"
        :style="`background-color: ${b.bgColor}`" ref="boardItem"> -->
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{b.title}}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a class="new-board-btn" href="" @click.prevent="SET_IS_ADD_BOARD(true)">
          Create new board...
        </a>
      </div>
    </div>
    <!-- <AddBoard v-if="isAddBoard"
              @close="isAddBoard=false"
              @submit="onAddBoard" /> -->
    <AddBoard v-if="isAddBoard" />
  </div>
</template>

<script>
// import axios from 'axios'
import {board} from '../api'
// import router from '../router'
import AddBoard from './AddBoard.vue'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  components: {
    AddBoard
  },
  data() {
    return {
      loading: false,
      // boards: [],  // -> [ Vuex 적용 - 보드 목록 조회 ]
      // error: ''  // -> 리다이렉트 때문에 더이상 쓰지 않음
      // isAddBoard: false  // -> vuex store로 이동
    }
  },
  // 1) vuex store
  // computed: {
  //   isAddBoard() {
  //     return this.$store.state.isAddBoard
  //   }
  // },

  // 2) vuex mapState
  // computed: mapState([
  //     'isAddBoard'
  // ]),
  // computed 속성에 mapState 결과값을 설정해버리면
  // 따로 computed 속성을 추가할 수 없어요.
  // 그래서 es6 문법의 해체 문법을 써줍니다.
  // 이렇게 해서 다른 속성을 추가할 수 있겟죠.
  // 보통은 요렇게 해서 사용합니다.

  // 3) vuex mapState + es6 Spread syntax
  computed: {
    //   ...mapState([
    //   'isAddBoard'
    // ]),
      ...mapState({
      // 'isAddBoard'
      isAddBoard: 'isAddBoard',
      boards: 'boards'
    }),
    // foo() {
    //
    // }
  },
  created() {
    // This is why the '/' redirected to login page instantly
    this.fetchData()
    // [ 색상 입히기 2 ]
    this.SET_THEME()
  },
  // data 객체에 변화가 감지되면 updated 훅이 실행됩니다.
  // 이 친구가 하는 일은, 이 컴포넌트의 레퍼런스 중에 boardItem이라는 녀석을
  // 찾아와요.
  // 얘는 보드의 개수 만큼 생기는데 유념해야 보셔야 할 게
  // 이 bgColor라는 값이 data-bgcolor라는 키에 들어가 있어요.
  // 다시 updated로 와서, 그러한 보드 아이템 element를 순회하면서
  // 그 element의 스타일 중에 backgroundColor를 변경합니다.
  // 그때 dataset의 bgColor를 가져와서 세팅하는 거죠.
  // 그렇기 때문에 화면에 이 심플보드가 파란색으로 나오는 겁니다.
  updated() {
    this.$refs.boardItem.forEach(el => {
      el.style.backgroundColor = el.dataset.bgcolor
    })
  },
  methods: {
    ...mapActions([
      'FETCH_BOARDS'
    ]),
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

      // [ Vuex 적용 - 보드 목록 조회 ]
      // board.fetch()
      //   .then(data => {
      //     this.boards = data.list
      //   })
      //   .finally(_=> {
      //     this.loading = false
      //   })
      // ->
      this.FETCH_BOARDS().finally(_=> {
        this.loading = false
      })
    },
    // 그러면 팝업을 띄우기 위해서는 'Create Board'를 클릭했을 때
    // 동작하는 함수를 수정해야 합니다.
    // 'Create Board'를 클릭하게 되면 'addBoard' 함수가 호출이 되죠.
    // 그러면 addBoard에서는 isAddBoard를 true값으로 바꾸는데
    // 사실 요거는 잘못된 코드죠.
    // 실제로 변경해야 될 것은 요 store에 있는 isAddBoard라는 state값을
    // 변경해야하는데 요것을 변경하기 위해서는 mutation 즉 변이 라는 것을
    // 사용해야 합니다.

    // addBoard() {
    //   // this.isAddBoard = true
    //   this.$store.commit('SET_IS_ADD_BOARD', true)
    // },
    // mapState처럼 mutation도 헬퍼함수가 있어요.
    // 문서에 보면 mapMutations 헬퍼함수 사용하는 부분이 있는데
    // mapMutations도 똑같이 배열로 mutation 이름을 넣어주면은
    // 이번엔 computed 속성이 아닌 method 속성에 추가할 수 있습니다.
    ...mapMutations([
      'SET_IS_ADD_BOARD',
      'SET_THEME'
    ]),

    // onAddBoard(title) {
    //   console.log(title)
    //   board.create(title)
    //     .then(() => this.fetchData())
    //     // 그리고 성공을 하게 되면 return 값이 올건데
    //     // 그 리턴값은 쓰지 않고 요렇게 해보면 어떨까요?
    //     // fetchData(). 이렇게 하면 다시 모든 보드 목록을
    //     // 호출해서 화면을 다시 그릴거예요.
    //     // 왜냐면 fetchData가 board 조회 api를 호출하고
    //     // this.boards 데이터를 갱신하니까
    //     // 다시 화면이 refresh 될거예요.
    // },

    // [ Vues 적용 - 보드 목록 조회 ]
    // onAddBoard() {
    //   // [ 액션(Action) ]
    //   // 그리고 Home component에 가보면 submit 이벤트가 발생할 때
    //   // onAddBoard 함수가 호출되죠.
    //   // 그래서 onAddBoard 함수에서는 요 title은 받지 않구요.
    //   // api call도 하지 않습니다.
    //   // 단순히 fetchData만 호출하도록 변경했어요.
    //   this.fetchData()
    // }
    // ->
    // AddBoard.vue 에서 3) mapActions 사용 (2) - ADD_BOARD + FETCH_BOARDS
    // 로 인해 onAddBoard() 필요 없어짐.
  }
}
</script>

<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item-new {
  background-color: #ddd;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0,0,0, .1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>
