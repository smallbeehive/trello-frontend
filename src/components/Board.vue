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
            <input v-if="isEditTitle" type="text" class="form-control"
                   v-model="inputTitle" ref="inputTitle"
                   @blur="onSubmitTitle"
                   @keyup.enter="onSubmitTitle">
            <span v-else class="board-title" @click="onClickTitle">{{board.title}}</span>

            <a class="board-header-btn show-menu" href=""
              @click.prevent="onShowSettings">
              ... Show Menu
            </a>
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
      <BoardSettings v-if="isShowBoardSettings" />
      <router-view></router-view>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import List from './List.vue'
import BoardSettings from './BoardSettings.vue'
import dragger from '../utils/dragger'

export default {
  components: {
    List,
    BoardSettings
  },
  data() {
    return {
      bid: 0,
      loading: false,
      // dragula 라이브러리의 인스턴스를 만들기위한 상태변수
      // dragulaCards: null
      cDragger: null,
      // dragularCards 라고 되있는데 이거는 좀 간단한 이름으로
      // cDragger라고 할게요. 왜냐면 dragger를 통해서 만들었다는 의도에요.
      isEditTitle: false,
      inputTitle: ''
    }
  },
  computed: {
    ...mapState({
      board: 'board',
      isShowBoardSettings: 'isShowBoardSettings'
    })
  },
  created() {
    // this.fetchData()

    // [ 색상 입히기 4 ]
    // SET_THEME을 호출해줘야 되는데
    // 어디서 호출하냐면 create 될 때 호출하겠습니다.
    // 이때 fetchData가 되고난 다음에 여기서 호출하겠습니다.
    // 이때 SET_THEME할 때 테마 컬러 값을 전달해줄 수 있죠.
    // 보드의 컬러값은 this.board.bgColor
    // 그리고 fetchData가 Promise르 반환해줘야 then 함수를 쓸 수 있어요.
    // 그래서 fetchData()에서 FETCH_BOARD 실행결과를 return 해주면 되겠죠.
    this.fetchData().then(() => {

      // [ 보드수정 - 타이틀 변경 ]
      // 그런데 사실은 이 (data에 선언한 inpuTitle) 값은
      // 이미 서버로 부터 받았을 거예요. 그렇기 때문에 created 훅에서
      // fetchData 한다음에 받은 데이터를 세팅해주면 되겠죠.
      // 즉, computed 속성으로 가져온 board 객체의 title 값을 세팅해주는 겁니다.
      this.inputTitle = this.board.title

      this.SET_THEME(this.board.bgColor)
    })

    // [ 보드 세팅 3 ]
    this.SET_IS_SHOW_BOARD_SETTINGS(false)

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
    // updated도 메서드로 좀 빼는게 나을 것 같아요.
    this.setCardDragabble()

    // if (this.dragulaCards) this.dragulaCards.destroy()
    // this.dragulaCards = dragula([
    //   ...Array.from(this.$el.querySelectorAll('.card-list'))
    // ]).on('drop', (el, wrapper, target, siblings) => {
    //   // 요렇게해서 간단하게 drag and drop을 구현했어요.
    //   // 그러면 나머지는 요 drag 했고 drop했을 때 이 시점에
    //   // position 값을 계산하는 거예요.
    //   // position 값을 계산하려면 리스트내에 카드가 어느위치에 있는지
    //   // 확인해야 겠죠.
    //   // 첫번째로 갔는지 맨 아래로 갔는지 혹은 중간으로 갔는지를 판단해야 됩니다.
    //   // 로그보다는 디버그를 통해서 어떤 값이 들어오는지 확인해 볼게요.
    //   // drop 하면 debugger가 멈췄구요. 여기서 el갑이 어떤 값인지 보죠.
    //   // 요 단서를 가지고 계속 개발해 볼게요.
    //   // debugger
    //
    //   // 먼저는 타겟 카드라고 하나 만들게요. 이제 요거는 어디로 이동해야할지
    //   // 그 정보를 담고있는 객체입니다.
    //   // 그래서 카드 아이디를 받아야겠죠. el의 dataset으로 받을 거예요. 문자열이니까 숫자로 바꿔주고요.
    //   // 기본적인 postion은 기본값 65535를 쓰겠습니다.
    //   // 카드 아이디를 받으려면 CardItem에서 data-card-id 를 설정해줘야겠죠.
    //   // 그리고 이제 요게 앞 뒤에 어떤 카드들이 있는지 확인해야겠죠.
    //   // 그래서 그거를 변수로 prevCard로 하구요 nextCard로 해서 null값으로 초기화합니다.
    //   // 그리고 나서 우리가 봐야할 엘리멘트가 wrapper 엘리멘트에요.
    //   // 요것도 debugger를 찍어서 확인해 볼게요. drop해보면 wrapper는 card-list(클래스)를 의미합니다.
    //   // card-list 안에는 card-item이라는 클래스명을 통해서 이렇게 되어있어요.
    //   // 그럼 우리는 그 card-list를 뽑아야겠죠.
    //   // wrapper의 querySelector로 .card-item으로 card-item 배열을
    //   // 뽑아낼 수 있습니다. 요거는 유사배열이니까 Array.from으로 뽑아내야겠죠.
    //   // 그 다음에 얘를 forEach로 돌린다음에
    //   // 여기서 카드아이템 하나씩 체크하면서 현재 카드 위치를 파악해보겠습니다.
    //
    //   // 이렇게해서 prevCard와 nextCard를 배열을 순회하면서 찾았어요.
    //   // 여기서 마지막 postition 값을 계산해야겠죠.
    //   // prevCard가 없고, nextCard가 있다면 맨 앞에 있다는 뜻이겠죠.
    //   // 이럴때는 nextCard position의 절반을 계산하면 되요.
    //   if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2
    //
    //   else if (!nextCard && prevCard) targetCard.pos = prevCard.pos * 2
    //   else if (prevCard && nextCard) targetCard.pos = (prevCard.pos + nextCard.pos) / 2
    //
    //   // console.log(targetCard)
    //   // 요렇게 동작을 했구요. 그러면 이제 나머지는 요 postion값을 api로 전달해주면 되요.
    //   // action 함수를 추가하겠습니다.
    //   this.UPDATE_CARD(targetCard)
    //   // 여기서 UPDATE_CARD를 호출합니다. 이때 targetCard를 그대로 전달해주면 되겠죠.
    //
    //   // 여기서 postiton 정보를 추가해야할 부분이 하나 더 있어요. 뭐냐면 카드를 추가할때입니다.
    //   // 카드를 추가하는 부분이 AddCard하는 부분인데요.
    //   // 이때 우리는 단순히 title과 listId만 넘겨줬어요.
    //   // 그런데 카드는 위에서부터 차곡차곡해서 추가되기 때문에 맨 마지막에 있는 카드의
    //   // 포지션 정보를 참고해서 전달해줘야 합니다.
    //   // 그래야 카드 포지션 정보가 유니크하게 설정되겠죠.
    //   // 자 예를 들어서 card를 더 만들어볼게요.
    //   // card 4, card 5, card 6을 만들었습니다.
    //   // 이때 보면 card 6번이 어떻게 되있나 볼까요.
    //   // card 6을 만들었을 때 positon정보는 그대로 65535이에요.
    //   // card 5도 65536이에요.
    //   // 이렇게되면 card 6을 card 4와 5사이에 이동을 하더라도
    //   // 사이트를 갱신하게되면 다시 값이 초기화되버리죠.
    //   // 왜냐하면 요 세개의 positon 값이 다 동일하기 때문이에요.
    //   // 그렇기 때문에 카드를 추가할 때 맨 마지막에 있는 카드 값을 참고해서
    //   // 새로운 position 값을 계산해줘야 합니다.
    //   // 그래서 고 부분을 만들어볼게요.
    //   // 카드를 추가할 때 onSubmit이죠.
    //   // AddCard component에서 position 값을 계산해줘야되요.
    // })
  },
  methods: {
    ...mapMutations([
      'SET_THEME',
      'SET_IS_SHOW_BOARD_SETTINGS'
    ]),
    ...mapActions([
      'FETCH_BOARD',
      'UPDATE_CARD',
      'UPDATE_BOARD'
    ]),
    fetchData() {
      this.loading = true
      // setTimeout(() => {
      //   this.bid = this.$route.params.bid
      //   this.loading = false
      // }, 500)
      // this.FETCH_BOARD({id: this.$route.params.bid})
      // [ 색상 입히기 ]
      return this.FETCH_BOARD({id: this.$route.params.bid})
        .then(() => this.loading = false)
    },
    setCardDragabble() {
      if (this.cDragger) this.cDragger.destroy()

      this.cDragger = dragger.init(Array.from(this.$el.querySelectorAll('.card-list')))
      this.cDragger.on('drop', (el, wrapper, target, siblings) => {
        // 요렇게해서 간단하게 drag and drop을 구현했어요.
        // 그러면 나머지는 요 drag 했고 drop했을 때 이 시점에
        // position 값을 계산하는 거예요.
        // position 값을 계산하려면 리스트내에 카드가 어느위치에 있는지
        // 확인해야 겠죠.
        // 첫번째로 갔는지 맨 아래로 갔는지 혹은 중간으로 갔는지를 판단해야 됩니다.
        // 로그보다는 디버그를 통해서 어떤 값이 들어오는지 확인해 볼게요.
        // drop 하면 debugger가 멈췄구요. 여기서 el갑이 어떤 값인지 보죠.
        // 요 단서를 가지고 계속 개발해 볼게요.
        // debugger

        // 먼저는 타겟 카드라고 하나 만들게요. 이제 요거는 어디로 이동해야할지
        // 그 정보를 담고있는 객체입니다.
        // 그래서 카드 아이디를 받아야겠죠. el의 dataset으로 받을 거예요. 문자열이니까 숫자로 바꿔주고요.
        // 기본적인 postion은 기본값 65535를 쓰겠습니다.
        // 카드 아이디를 받으려면 CardItem에서 data-card-id 를 설정해줘야겠죠.
        // 그리고 이제 요게 앞 뒤에 어떤 카드들이 있는지 확인해야겠죠.
        // 그래서 그거를 변수로 prevCard로 하구요 nextCard로 해서 null값으로 초기화합니다.
        // 그리고 나서 우리가 봐야할 엘리멘트가 wrapper 엘리멘트에요.
        // 요것도 debugger를 찍어서 확인해 볼게요. drop해보면 wrapper는 card-list(클래스)를 의미합니다.
        // card-list 안에는 card-item이라는 클래스명을 통해서 이렇게 되어있어요.
        // 그럼 우리는 그 card-list를 뽑아야겠죠.
        // wrapper의 querySelector로 .card-item으로 card-item 배열을
        // 뽑아낼 수 있습니다. 요거는 유사배열이니까 Array.from으로 뽑아내야겠죠.
        // 그 다음에 얘를 forEach로 돌린다음에
        // 여기서 카드아이템 하나씩 체크하면서 현재 카드 위치를 파악해보겠습니다.

        const targetCard = {
          id: el.dataset.cardId * 1,
          pos: 65535
        }
        const {prev, next} = dragger.sibling({
          el,
          wrapper,
          candidates: Array.from(wrapper.querySelectorAll('.card-item')),
          type: 'card'
        })

        // 이렇게해서 prevCard와 nextCard를 배열을 순회하면서 찾았어요.
        // 여기서 마지막 postition 값을 계산해야겠죠.
        // prevCard가 없고, nextCard가 있다면 맨 앞에 있다는 뜻이겠죠.
        // 이럴때는 nextCard position의 절반을 계산하면 되요.
        if (!prev && next) targetCard.pos = next.pos / 2
        else if (!next && prev) targetCard.pos = prev.pos * 2
        else if (prev && next) targetCard.pos = (prev.pos + next.pos) / 2
        // console.log(targetCard)
        // 요렇게 동작을 했구요. 그러면 이제 나머지는 요 postion값을 api로 전달해주면 되요.
        // action 함수를 추가하겠습니다.
        this.UPDATE_CARD(targetCard)
        // 여기서 UPDATE_CARD를 호출합니다. 이때 targetCard를 그대로 전달해주면 되겠죠.

        // 여기서 postiton 정보를 추가해야할 부분이 하나 더 있어요. 뭐냐면 카드를 추가할때입니다.
        // 카드를 추가하는 부분이 AddCard하는 부분인데요.
        // 이때 우리는 단순히 title과 listId만 넘겨줬어요.
        // 그런데 카드는 위에서부터 차곡차곡해서 추가되기 때문에 맨 마지막에 있는 카드의
        // 포지션 정보를 참고해서 전달해줘야 합니다.
        // 그래야 카드 포지션 정보가 유니크하게 설정되겠죠.
        // 자 예를 들어서 card를 더 만들어볼게요.
        // card 4, card 5, card 6을 만들었습니다.
        // 이때 보면 card 6번이 어떻게 되있나 볼까요.
        // card 6을 만들었을 때 positon정보는 그대로 65535이에요.
        // card 5도 65536이에요.
        // 이렇게되면 card 6을 card 4와 5사이에 이동을 하더라도
        // 사이트를 갱신하게되면 다시 값이 초기화되버리죠.
        // 왜냐하면 요 세개의 positon 값이 다 동일하기 때문이에요.
        // 그렇기 때문에 카드를 추가할 때 맨 마지막에 있는 카드 값을 참고해서
        // 새로운 position 값을 계산해줘야 합니다.
        // 그래서 고 부분을 만들어볼게요.
        // 카드를 추가할 때 onSubmit이죠.
        // AddCard component에서 position 값을 계산해줘야되요.
      })
    },
    // [ 보드 세팅 2 ]
    onShowSettings() {
      this.SET_IS_SHOW_BOARD_SETTINGS(true)
    },
    // [ 보드 수정 - 타이틀 변경 ]
    onClickTitle() {
      this.isEditTitle = true
      // this.$refs.inputTitle.focus()
      // 코드를 다시 한번 확인해보죠.
      // 아마도 요부분이 클릭했을 때 바로 focus를 달게 했는데 이렇게
      // 안될 때는 this.$nextTick()을 통해서 타이머로 실행을 지연시켜 줍니다.
      this.$nextTick(() => this.$refs.inputTitle.focus())
    },
    onSubmitTitle() {
      this.isEditTitle = false

      this.inputTitle = this.inputTitle.trim()
      if (!this.inputTitle) return

      const id = this.board.id
      const title = this.inputTitle
      if (title === this.board.title) return

      this.UPDATE_BOARD({id, title})
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
