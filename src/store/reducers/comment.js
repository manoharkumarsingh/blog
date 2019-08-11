import {
    COMMENT_BLOG,
    BLOG_All_COMMENTS
  } from '../actionTypes';
  
  const initialState = {
    commentedblogs: {
        _id : '',
        title:'',
        content:'',
        comment :[]
    },
    
    allcomments:[]
  }
  export default function(state = initialState, action){
    switch(action.type){
        case COMMENT_BLOG:
        return {
            ...state,
            commentedblogs: action.payload
          };
        case BLOG_All_COMMENTS :
        return {
            ...state,
            allcomments: action.payload
          };
        default:
            return state; 
    }
}



