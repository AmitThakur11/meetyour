import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  user: {},
  otherUsers: [],
  otherUserProfile: {},
  status: "loading",
  login: JSON.parse(localStorage?.getItem("auth"))?.login,
};

export const register = createAsyncThunk("/user/register", async (userData) => {
  const response = await axios.post("/auth/register", userData);
  return response.data.data;
});

export const login = createAsyncThunk("user/login", async (userData) => {
  const response = await axios.post("/auth/login", userData);
  return response.data.data;
});

export const fetchUser = createAsyncThunk("/user/detail", async () => {
  const response = await axios.get("/user/userProfile");
  return response.data.data;
});

export const allUsers = createAsyncThunk("/user/all", async () => {
  const response = await axios.get("/user/all");
  return response.data.data;
});

export const changeProfilePic = createAsyncThunk(
  "/user/profile_pic",
  async (displayPic) => {
    const response = await axios.post("/user/changepic", { displayPic });
    return response.data.data;
  }
);

export const followUser = createAsyncThunk(
  "user/follow",
  async ({ toFollow }) => {
    const response = await axios.post(`user/follow/${toFollow}`);
    return response.data.data;
  }
);

export const savePost = createAsyncThunk("user/savePost", async (postId) => {
  const response = await axios.post(`/post/save/${postId}`);
  return response.data.data;
});

export const editProfile = createAsyncThunk("user/edit", async (updateData) => {
  const response = await axios.post("user/editprofile", updateData);
  return response.data.data;
});

export const deletePost = createAsyncThunk("post/delete", async (postId) => {
  const response = await axios.delete(`post/delete/${postId}`);
  return { data: response.data.data, postId: postId };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("auth");
      return initialState
      
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.status = "loading";
    },
    [register.fulfilled]: (state, { payload }) => {
      state.user = payload.data;
      state.login = true;
      localStorage.setItem(
        "auth",
        JSON.stringify({ token: payload.token, login: true })
      );
      state.status = "success";
    },
    [register.rejected]: (state, action) => {
      state.status = "failed";
    },
    [login.pending]: (state, { payload }) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload.data;
      state.login = true;
      localStorage.setItem(
        "auth",
        JSON.stringify({ token: payload.token, login: true })
      );
      state.status = "success";
    },
    [login.rejected]: (state, { error }) => {
      state.status = "failed";
      toast.error("user not found");
    },
    [fetchUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.status = "success";
      state.login = true;
    },
    [fetchUser.rejected]: (state, action) => {
      localStorage.removeItem("auth");
      state.login = false;
      state.success = "failed";
    },
    [followUser.fulfilled]: (state, { payload }) => {
      const { user, userYouFollow } = payload;
      
      const toFollowIndex = state.otherUsers.findIndex(
        (user) => user._id === userYouFollow._id
      );
      state.otherUsers[toFollowIndex] = userYouFollow;
      state.user.following = user.following;
      state.status = "success";
    },
    [changeProfilePic.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeProfilePic.fulfilled]: (state, { payload }) => {
      state.user.displayPic = payload.displayPic;
      state.status = "success";
    },
    [changeProfilePic.rejected]: (state, action) => {
      state.status = "failed";
    },
    [allUsers.fulfilled]: (state, { payload }) => {
      state.otherUsers = payload;
    },
    [allUsers.rejected]: (state, payload) => {
      state.status = "failed";
    },
    [savePost.fulfilled]: (state, { payload }) => {
      state.user.savePost = payload;
    },
    [editProfile.pending]: (state, { payload }) => {
      state.status = "loading";
    },
    [editProfile.fulfilled]: (state, { payload }) => {
      const { username, email, bio, dateOfBirth, website } = payload;
      state.user.username = username;
      state.user.email = email;
      state.user.bio = bio;
      state.user.dateOfBirth = dateOfBirth;
      state.user.website = website;
      state.status = "success";
    },
    [editProfile.rejected]: (state, action) => {
      state.status = "error";
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      const { postId } = payload;
      const updateUserPosts = state.user.post.filter(
        (post) => post._id === postId
      );
      const updateUsersavePosts = state.user.savePost.filter(
        (post) => post._id === postId
      );

      toast.success("Post removed");
      state.user.post = updateUserPosts;
      state.user.savePost = updateUsersavePosts;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
