import { configureStore } from '@reduxjs/toolkit';
import PostReducer from "../features/post/postSlice"

const Store = configureStore({
  reducer: {
    post : PostReducer
  },
});

export default Store