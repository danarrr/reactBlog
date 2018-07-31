let nextTodoId = 0
export const getArticleId = id => ({//创建action
  type: 'GET_ARTICLE_ID',
  id
})

export const increaseAction = id =>{
  return{
    type: 'increase',
    id
  }
}
