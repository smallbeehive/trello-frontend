<template>
  <div class="board-menu">
    <div class="board-menu-header">
      <div class="header-title">Menu</div>
      <a class="header-close-btn" href="" @click.prevent="onClose">&times;</a>
    </div>
    <ul class="menu-list">
      <li>
        <a href="" @click.prevent="onDeleteBoard">
          Delete Board
        </a>
      </li>
      <li>Change Background</li>
      <div class="color-picker">
        <a href="" data-value="rgb(0, 121, 191)" @click.prevent="onChangeTheme"></a>
        <a href="" data-value="rgb(210, 144, 52)" @click.prevent="onChangeTheme"></a>
        <a href="" data-value="rgb(81, 152, 57)" @click.prevent="onChangeTheme"></a>
        <a href="" data-value="rgb(176, 70, 50)" @click.prevent="onChangeTheme"></a>
      </div>
    </ul>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState({
      board: 'board'
    })
  },
  // [ 보드 수정 - 색상 변경 ]
  // onChangeTheme을 바인딩해줘야하는데
  // 그전에 하이퍼링크 값들이 요 data-value로 가지고 있는 색상들이
  // 실제 이 a 태그의 background 값이 되어야 해요.
  // mounted로 할게요.
  // 왜냐면 이 BoardSettings component가
  // 부모 component에 붙어서 DOM에 추가됬을 시점입니다.
  // 그때 DOM 조작을 할 수 있기 때문에 Mounted 훅에다가
  // 달아놓죠.
  mounted() {
    // Array.from(this.$el.querySelectorAll('.color-picker a')).forEach(el => {
    //   el.style.backgroundColor = el.dataset.value
      // 그러면 요 component가 rendering 될 때 data-value로 설정한 색상 값이
      // 요 a 태그의 background 값이 될거예요.
    this.$el.querySelectorAll('.color-picker a').forEach(el => {
      el.style.backgroundColor = el.dataset.value
    })
  },
  methods: {
    ...mapMutations([
      'SET_IS_SHOW_BOARD_SETTINGS',
      'SET_THEME'
    ]),
    ...mapActions([
      'DELETE_BOARD',
      'PARTIAL_UPDATE_BOARD'
    ]),
    onClose() {
      this.SET_IS_SHOW_BOARD_SETTINGS(false)
    },
    onDeleteBoard() {
      if (!window.confirm(`Delete ${this.board.title} Board?`)) return
      this.DELETE_BOARD({id: this.board.id})
        .then(() => this.SET_IS_SHOW_BOARD_SETTINGS(false))
        .then(() => this.$router.push('/'))
    },
    onChangeTheme(el) {
      const id = this.board.id
      const bgColor = el.target.dataset.value
      this.PARTIAL_UPDATE_BOARD({id, bgColor})
        .then(_ => this.SET_THEME(bgColor))
    }
  }
}
</script>

<style>
.board-menu {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: #edeff0;
  width: 300px;
  transition: all .3s;
}
.board-menu-header {
  height: 46px;
  padding: 0 6px 0 12px;
  border-bottom: #bbb solid 1px;
}
.header-title {
  font-size: 18px;
  text-align: center;
  line-height: 46px;
  font-weight:700;
}
.header-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  font-size: 24px;
  color: #999;
}
.menu-list {
  list-style: none;
  padding-left: 0px;
}
.menu-list li {
  height: 18px;
  line-height: 18px;
  padding: 10px;
  margin: 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 5px;
  cursor: pointer;
}
.menu-list li:hover,
.menu-list li:focus {
  background-color: rgba(0,0,0, .1);
}
.menu-list li a {
  text-decoration: none;
  color: inherit;
}
.color-picker {
  margin: 0 15px;
}
.color-picker a {
  display: inline-block;
  width: 49%;
  height: 100px;
  border-radius: 8px;
}
</style>
