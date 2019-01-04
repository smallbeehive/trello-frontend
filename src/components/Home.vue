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
        <a class="new-board-btn" href="" @click.prevent="addBoard">
          Create new board...
        </a>
      </div>
    </div>
    <!-- <AddBoard></AddBoard> -->
    <AddBoard v-if="isAddBoard" @close="isAddBoard=false" />
  </div>
</template>

<script>
// import axios from 'axios'
import {board} from '../api'
// import router from '../router'
import AddBoard from './AddBoard.vue'

export default {
  components: {
    AddBoard
  },
  data() {
    return {
      loading: false,
      boards: [],
      // error: ''  // 리다이렉트 때문에 더이상 쓰지 않음
      isAddBoard: false
    }
  },
  created() {
    // This is why the '/' redirected to login page instantly
    this.fetchData()
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

      board.fetch()
        .then(data => {
          this.boards = data.list
        })
        // .finally(() => {
        .finally(_=> {
          this.loading = false
        })
    },
    addBoard() {
      this.isAddBoard = true
    }
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
