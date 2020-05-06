
const initialState = {
  storyIdList: [],
  storyList: [],
  story: {
    title: "",
    by: "",
    time: 0,
    score: 0,
    url: "",
    link: "",
    linkUrl: "",
    kids: [],
    id: 0,
    haveKids: false,
    showComment: false,
  },
  loadingSpinner: false
}

export const storyReducer = (state = initialState, action) => {

  switch(action.type){
    case 'ADD_STORY_IDLIST':
      return {
        ...state,
        storyIdList: action.payload.storyIdList
      }
    case 'ADD_STORY':
      return {
        ...state,
        storyList: [
          ...state.storyList,
          action.payload.story
        ]
      }
    case 'SHOW_STORY_KIDS':
      return {
        ...state,
        storyList: 
        state.storyList.map(elem => {
          if(elem.haveKids == true && elem.id == action.payload.storyId){
            elem.showComment = !elem.showComment
          }
          return elem
        })
      }
    case 'SPINNER_START_LOAD':
      return {
        ...state,
        loadingSpinner: true
      }
    case 'SPINNER_STOP_LOAD':
      return {
        ...state,
        loadingSpinner: false
      }
    
    default:
      return state
  }
}