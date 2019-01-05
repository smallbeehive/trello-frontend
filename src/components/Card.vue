<template>
  <!-- <div>
    Card
    <div v-if="loading">loading card...</div>
    <div v-else>cid: {{cid}}</div>
  </div> -->
  <Modal class="modal-card">
  <div slot="header" class="modal-card-header">
    <div class="modal-card-header-title">
      <input class="form-control" type="text" :value="card.title"
             :readonly="!toggleTitle"
             @click="toggleTitle=true"
             @blur="onBlurTitle"
             ref="inputTitle">
    </div>
    <a class="modal-close-btn" href="" @click.prevent="onClose">&times;</a>
  </div>
  <div slot="body">
    <h3>Description</h3>
    <textarea  class="form-control" cols="30" rows="3" placeholder="Add a more detailed description..."
      :readonly="!toggleDesc"
      @click="toggleDesc=true"
      @blur="onBlurDesc"
      ref="inputDesc"
      v-model="card.description"></textarea>
  </div>
  <div slot="footer"></div>
</Modal>
</template>

<script>
// [ 카드 상세 조회1 - 라우팅 ]
// 우리는 이 모달을 카드를 출력해주는 Card.vue component에서 쓸겁니다.
// 요 자체가 카드 컴포넌트니까요.
// 쓸려면 모달을 가져와야 겠죠.
import Modal from './Modal.vue'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    Modal
  },
  data() {
    return {
      toggleTitle: false,
      toggleDesc: false
    }
  },
  computed: {
    ...mapState({
      card: 'card',
      board: 'board'
    })
  },
  // watch: {
  //   // '$route'(newVal, oldVal) {   // '$route' works!
  //   $route() {
  //     // this.cid = this.$route.params.cid
  //     // cid가 변경될 때마다 백엔드 api를 호출하는 로직.
  //     // 그래서 화면을 갱신하는 것이기 때문에 여기에다가
  //     // fetchData를 호출하는게 맞아요.
  //     this.fetchData()
  //   }
  // },
  // created() {
  //   this.fetchData()
  //   // this.cid = this.$route.params.cid
  // },

    // 좀 더 코드를 개선해볼게요. watch를 설정할 때
    // 이렇게도 할 수 있어요.
    // 함수가 아닌 객체를 설정할 수 있는데
    // handler를 fetchData라는 문자열로 주고요
    // 그렇게 되면 이 fetchData를 실행하는 거예요.
    // 그리고 immediate라는 boolean값이 있는데
    // true를 주면 바로 즉시 시행하는 거예요.
    // created 안의 훅과 중복이죠.

  // [ 카드 상세 조회 2 - API 연동 ]
  // data() {
  //   return {
  //     cid: 0,
  //     loading: false
  //   }
  // },
  // watch: {
  //   // $route: {
  //   '$route': {
  //     handler: 'fetchData',
  //     immediate: true
  //   }
  // },
  // methods: {
  //   fetchData() {
  //     this.loading = true
  //     setTimeout(() => {
  //       this.cid = this.$route.params.cid
  //       this.loading = false
  //     }, 500)
  //   }
  // }
  created() {
    // const id = this.$route.params.cid
    // this.FETCH_CARD({id})
    this.fetchCard()
  },
  methods: {
    ...mapActions([
      'FETCH_CARD',
      'UPDATE_CARD'
    ]),
    onClose() {
      this.$router.push(`/b/${this.board.id}`)
    },
    fetchCard() {
      const id = this.$route.params.cid
      this.FETCH_CARD({id})
    },
    onBlurTitle() {
      this.toggleTitle = false
      const title = this.$refs.inputTitle.value.trim()
      if (!title) return
      this.UPDATE_CARD({id: this.card.id, title})
      // 호출이 완료되면 여기서 다시 카드를 FETCH해주면 되겠죠.
      // (created에 있는) 요거를 해주면 되는데, id 값도 받아와야 되기 때문에
      // fetchCard()라는 method로 (기존 created 안의 코드를)
      // refactoring 할게요.
        .then(() => this.fetchCard())
    },
    onBlurDesc() {
      this.toggleDesc = false
      const description = this.$refs.inputDesc.value.trim()
      if (!description) return
      this.UPDATE_CARD({id: this.card.id, description})
        .then(() => this.fetchCard())
    }
  }

}
</script>

<style>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-card-header-title {
  padding-right: 30px;
}
.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
}
</style>
