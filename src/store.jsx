import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './feautures/posts/postsSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
  },  
});