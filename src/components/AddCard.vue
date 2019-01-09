<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <input class="form-control" type="text" v-model="inputTitle" ref="inputText">
      <!-- <button class="btn" :class="{'btn-success': valid}" type="submit" >Add Card</button> -->
      <button class="btn btn-success" :disabled="invalidInput" type="submit" >Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: ['listId'],
  data() {
    return {
      inputTitle: '',
    }
  },
  // watch: {
  //   inputTitle(v) {
  //     console.log(v)
  //     this.valid = v.trim().length > 0
  //   }
  // },
  computed: {
    invalidInput() {
      return !this.inputTitle.trim()
    }
  },
  mounted() {
    this.$refs.inputText.focus()
    this.setupClickOutside(this.$el)
    // this.$el하면 이 AddCard component의 element가 넘어가요.
    // 그걸 setupClickOutside에서 el로 받겠습니다.
    // 그래서 el에 DOM 함수중에 contains 함수가 있어요.
    // 이게 클릭한 element를 포함하고 있는지, 포함하고 있다면 현재 컴포넌트를
    // 클릭한 거기 때문에 아무 동작도 하지 않구요.
    // 그렇지 않을 경우에만 close event를 emit해서 List.vue component한테
    // 닫아달라고 요청하면 되겠죠.
  },
  methods: {
    ...mapActions([
      'ADD_CARD'
    ]),
    onSubmit() {
      if (this.invalidInput) return
      // 호출하기 전에 invalidInput이면 반환하도록 방어코드를 만듭니다.
      // 그리고 나서 action에 전달하기 위한 인자들을 가져오는데요
      // this에서 inputTitle을 가져옵니다. 입력한 값이죠.
      // 그리고 우리 ADD_CARD action을 호출할 때는 title 뿐만이 아니라
      // listId와 postion 정보도 가져오게 되있어요.
      // 제가 api를 만들때 postion 값은 optional 값으로 정했기 때문에 전달해주지 않아도 됩니다.
      // 대신에 listId는 반드시 전달해줘야되요.
      // 그래서 AddCard에서 listId도 받아와야 되는데 우리는 요거를
      // 부모 컴포넌트 List component 에서 받도록 할게요.

      const {inputTitle, listId} = this

      // [ 카드 이동 2 - 구현 ]
      const pos = this.newCardPos()

      this.ADD_CARD({title: inputTitle, listId, pos})
        .finally(() => this.inputTitle = '')
    },
    newCardPos() {
      // 여기서는 맨 마지막에 있는 카드 정보를 받아와야 겠어요.
      // 그래서 curList라고 해서 this의 선택된 보드는 store객체에 있죠.
      // lists에 filter를 걸어서 이 리스트와 listId가 같은지 체크하면 되겠죠.
      // 지금 listId는 props로 받고 있어요.
      // 요 값이 같은지 확인해서 필터를 걸구요. 필터에 0번 인덱스를 참조하면 됩니다.
      const curList = this.$store.state.board.lists.filter(l => l.id === this.listId)[0]
      if (!curList) return 65535
      // 만약에 curLlist가 없다면 기본값인 65535를 반환하구요.
      // 그렇지 않으면 이제 있는거예요.
      // curList 중에 cards라는 배열을 가져옵니다.
      const {cards} = curList
      // 그래서 요 cards 배열의 length가 만약에 0이라면 이때도 기본값을 반환하도록 하죠.
      if (!cards.length) return 65535
      // 그리고 나서 카드의 length가 있다면 맨마지막에 있는 카드의 positon 정보를 가져오고
      // 거기서 2배한 값을 전달해주면 되겠습니다.
      return cards[cards.length -1].pos * 2
    },
    setupClickOutside(el) {
      let close = () => {
        this.$emit('close')
      }
      document.querySelector('body').addEventListener('click', function handler(e) {
        // if (el.contains(e.currentTarget)) return
        if (el.contains(e.target)) return
        // this.$emit('close')

        // 2019.01.09 [hot fix : remove duplicate event logic]
        console.log('hi3')
        close()
        document.querySelector('body').removeEventListener('click', handler)
      })
    }
  }
}
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>
