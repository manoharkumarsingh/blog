import { ADD_USER, LOGGED_IN_USER } from "../actionTypes";

const initialState = {
  user: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return { ...state, addedUser: action.payload };
    case LOGGED_IN_USER:
      return {
        ...state,
        loginUser: action.payload
      };

    default:
      return state;
  }
}
