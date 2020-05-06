
const initialState = {
  commentIdList: [],
  commentList: [],
  comment: {
    by: "",
    time: 0,
    text: "",
    kids: [],
    parrent: "",
    id: 0,
    haveKids: false,
    showComment: false
  }
}

export const commentReducer = (state = initialState, action) => {

  switch(action.type){
    case 'ADD_COMMENT_IDLIST':
      return {
        ...state,
        commentIdList: action.payload.commentIdList
      }
    case 'ADD_COMMENT':
      return{
        ...state,
        commentList: [
          ...state.commentList,
          action.payload.comment
        ]
      }
    case 'SHOW_COMMENT_KIDS':
      return{
        ...state,
        commentList: 
        state.commentList.map(elem => {
          if(elem.haveKids == true && elem.id == action.payload.commentId){
            elem.showComment = !elem.showComment
          }
          return elem
        })
      }
    
    default:
      return state
  }
}