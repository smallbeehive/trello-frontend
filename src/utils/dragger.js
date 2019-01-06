import dragula from 'dragula'
import 'dragula/dist/dragula.css'

const dragger = {
  init(container) {
    return dragula([...container])
  },
  // sibling은 인자로 주어준 target을 기준으로해서
  // 전 객체와 그 다음 객체를 반환하는 그런 역할을 하도록 할게요.
  // 인자를 받아야하는데 뭐가올지 모르니까 우선 객체로 받아놓고
  // 지금 있는 element 즉 targetCard 겠죠.
  // element와 wrapper 객체를 받겠습니다.
  // 그리고 candidates라고해서
  // 요 배열을 돌 수 있는 후보군들을 받겠습니다.
  // 그리고 마지막으로 type이라는 것을 하나 받을텐데요.
  // 지금 drag and drop을 카드에만 적용했는데
  // 우리는 list도 drag and drop을 구현하겠습니다.
  // 그래서 drag and drop 할 대상이 list인지 targetCard인지
  // 그 정보를 type로 받는겁니다.
  // 현재 아이디를 뽑아올거예요. 현재 el의 dataset을 통해서 뽑아오죠.
  // 그런데 여기서는 type에 따라서 요 키가 달라지기 때문에
  // type + 'Id' 이렇게 하면 card id 혹은 list id가 받아지겠죠.
  // targetCard 부분은 아직 positon만 안정해졌는데 우선은
  // 삭제 하죠.

  sibling({el, wrapper, candidates, type}) {
    // const curId = el.dataset.cardId * 1 or posId * 1
    const curId = el.dataset[type + 'Id'] * 1
    // let prevCard = null
    // let nextCard = null
    let prev = null
    let next = null

    // Array.from(wrapper.querySelectorAll('.card-item'))
    candidates.forEach((el, idx, arr) => {
        // 이 배열을 순회하면서 현재 카드의 id를 받아올게요.
        const id = el.dataset[type + 'Id'] * 1
        // 그래서 만약에 이 카드 아이디가 우리가 이동하고자 하는
        // targetCard의 id와 동일하다면
        // 앞 뒤의 카드를 계산하는 거예요.
        // 그래서 prevCard 부터 계산할게요.
        // 만약 idx 값이 0보다 크다면 맨 앞에 있는게 아니에요.
        // 그래서 고것의 이전카드는 arr[idx -1]이겠죠.
        // 여기서 cardId를 dataset으로 뽑아옵니다.
        // 그리고 postion도 뽑아와야되요.
        // dataset의 cardPos로 뽑아올게요. 그런데 position 정보는
        // 아직 바인딩하지 않았어요. position 정보도
        // :data-card-pos="data.pos"로 바인딩해줍니다.
        // 이렇게 됬고 만약에 idx가 0이거나 0보다 작으면 맨 앞에 있는 거잖아요.
        // prevCard는 없는 것으로 판단합니다.
        // nextCard도 계산할 수 있는데요. idx 값이 array의 마지막 값보다
        // 작으면, 즉 마지막이 아니라면 nextCard가 있는 거겠죠.
        // if (cardId == targetCard.id) {
        if (id == curId) {
          prev = idx > 0 ? {
            id: arr[idx -1].dataset[type + 'Id'] * 1,
            pos: arr[idx -1].dataset[type + 'Pos'] * 1
          } : null
          next = idx < arr.length - 1 ? {
            id: arr[idx +1].dataset[type + 'Id'] * 1,
            pos: arr[idx +1].dataset[type + 'Pos'] * 1
          } : null
        }
      })

    return {prev, next}
  }
}

export default dragger
