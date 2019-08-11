import { combineReducers } from "redux";
import Blog from "./blog";
import Comment from "./comment";
import User from "./user";

const allReducers = combineReducers({
  Blog: Blog,
  Comment: Comment,
  User: User
});

export default allReducers;
