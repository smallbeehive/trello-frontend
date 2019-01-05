<template>
    <!-- <div>
      Board
      <div v-if="loading">loading board...</div>
      <div v-else>
        <div>bid: {{bid}}</div>
        <pre>{{board}}</pre>
        <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
        <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
      </div>
      <hr />
      <router-view></router-view>
    </div> -->
    <div>
      <div class="board-wrapper">
        <div class="board">
          <div class="board-header">
            <span class="board-title">{{board.title}}</span>
          </div>
          <div class="list-section-wrapper">
            <div class="list-section">
              <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
                <!-- v-for를 쓸때는 :key attribute를 바인딩해야되죠
                그래서 요 배열안에서 유일한 식별자를 할당하는데 보통은 id를 할당합니다.
                그런데 여기서는 미리 pos라고 해서 pos 정보를 할당할게요.
                요거는 뒤에 설명할거지만 postion이라고 해서 drag and drop할 때
                위치 정보를 저장하는 값입니다.
                그래서 요것도 유일한 정보이기 때문에 포지션 정보를 키로 할당했습니다.-->
                <List v-bind:data="list" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import List from './List.vue'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

export default {
  components: {
    List
  },
  data() {
    return {
      bid: 0,
      loading: false,
      dragulaCards: null
    }
  },
  computed: {
    ...mapState({
      board: 'board'
    })
  },
  created() {
    this.fetchData()

    // console.log(this.$route.params.bid)
    // 이렇게 볼 수 있는 이유는 router를 설정할 때
    // Vue의 use라는 함수를 통해서 VueRouter를
    // 미들웨어 식으로 추가.
    // 그래서 Vue를 통해서 만든 Vue 인스턴스는
    // $route라는 변수를 통해서 router 정보에 접근할 수
    // 있는 겁니다.
    // 그러면 이 정보를 BoardComponent 화면에 출력해 보겠습니다.
    // this.bid = this.$route.params.bid
  },
  // drag and drop 할려면 요 board 컴포넌트 내에 있는
  // 모든 자식 컴포넌트들이 다 렌더링 된 후에 설정을 해줘야 되요.
  // 그럴려면 자식 컴포넌트가 다 mount되는 시점인 요 updated 함수에서 실행을 할게요.
  // 그래서 dragula 카드에 뭔 값이 있다고 하면 destroy로 불필요한 객체를 삭제해버립니다.
  // 그리고나서 this.dragulaCards에다가 다시 dragula 객체를 만들어냅니다.
  // 객체를 만들때는 컨테이너를 배열로 반환해야하는데
  // 요 카드의 목록을 담고있는 컨테이너를 넘겨줄거예요.
  // List.vue에 보면 요 카드아이템을 출력하는 부분이 있는데요
  // 요걸 감싸고 있는 부분이 card-list라는 클래스입니다.
  // 그래서 card-list를 selector로 해서 찾습니다.
  // 그리고 요거는 유사 배열이기 때문에 Array.from으로 만들어줘야되요.
  // 그리고 ... 하면 배열로 전달할 수 있습니다.
  // 그러고 난 다음에 dragula 문서에 보면 'on'이라는 함수를 통해서
  // 이벤트를 전달받게 되있어요.
  // 저는 이제 드래그 한다음에 드랍했을 때, 마우스를 띄었을 때 이벤트를 걸어보겠습니다.
  // 그러면 요 드랍 이벤트를 걸 수가 있겠죠.
  // on 한 다음에 drop 이벤트를 받게되는데, 이때 callback 함수가 전달해주는 element가 4개입니다.
  // 그러면 요 콜백함수가 제대로 동작하는지 로그를 찍어서 확인해볼게요.
  updated() {
    if (this.dragulaCards) this.dragulaCards.destroy()
    this.dragulaCards = dragula([
      ...Array.from(this.$el.querySelectorAll('.card-list'))
    ]).on('drop', (el, wrapper, target, siblings) => {
      console.log('drop')
    })
  },
  methods: {
    ...mapActions([
      'FETCH_BOARD'
    ]),
    fetchData() {
      this.loading = true
      // setTimeout(() => {
      //   this.bid = this.$route.params.bid
      //   this.loading = false
      // }, 500)
      this.FETCH_BOARD({id: this.$route.params.bid})
        .then(() => this.loading = false)
    }
  }
}
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
  touch-action: none;
}
.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
}
.board-header input[type=text] {
  width: 200px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0,0,0,.15);
  cursor: pointer;
}
.board-title {
  font-weight: 700;
  font-size: 18px;
}
.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}
.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.card-item.gu-transit {
  background-color: #555 !important;
}
.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>
