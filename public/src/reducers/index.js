import { combineReducers } from 'redux'
import articleDetail from './articleDetail'
import articleList from './articleList'

// export default combineReducers({
//   articleList,
//   articleDetail
// })

// function counter(state = { id: 0 }, action) {
//   console.log("reducer____", action)
//   console.log("reducer____", state)
//   const id = state.id
//   switch (action.type) {
//     case 'GET_ARTICLE_ID':
//       return { id: action.id }
//     default:
//       return state
//   }
// }
function counter(state = { count: 0 }, action) {//传入旧状态和action，返回新状态
  console.log("reducer____", action)
  console.log("reducer____", state)
  const count = state.count
  switch (action.type) {
    case 'increase':
      // return [//此处的更新必须是返回一个新的state，而不是在原来的state上做修改
      //   ...state,
      //   {
      //     count: count + 1,
      //     id: action.id
      //
      //   }
      // ]
      return Object.assign({}, state, {
        count: count + 1,
        id: action.id
      })
    default:
      return state
  }
}

export default counter;
