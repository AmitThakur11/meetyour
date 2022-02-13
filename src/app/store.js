import { configureStore } from '@reduxjs/toolkit';
import PostReducer from "../features/post/postSlice"
import UserReducer from "../features/user/userSlice"
const Store = configureStore({
  reducer: {
    post : PostReducer,
    user : UserReducer
  },
});

export default Store