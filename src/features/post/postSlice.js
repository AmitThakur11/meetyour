import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

export const getPosts = createAsyncThunk('post/getPosts',async ()=>{
    const response = await axios.get("post/all");
    
    return response.data.data
})

export const addPost = createAsyncThunk("post/add", async(postData)=>{
    console.log(postData)
    const response = await axios.post("post/addPost",postData);
    return response.data.data
})

export const likePost = createAsyncThunk("post/like",async(postId)=>{
    const response = await axios.post(`post/like/${postId}`);
    console.log(response.data.data.like)
    return {response : response.data.data.like , postId : postId }
})

export const addComment = createAsyncThunk("post/comment",async({postId, commentText})=>{
    console.log(commentText)
    const response = await axios.post(`comment/${postId}/add`,{commentText : commentText});
    console.log(response.data.data.comment)
    return {response : response.data.data.comment , postId : postId }
})




const initialState = {
    posts : [],
    status : 'loading'
}

const postSlice = createSlice({
    name :"post",
    initialState,
    reducers : {
        uploadPost : (state,action)=>{
            return state
        }
    },
    extraReducers :{
        [getPosts.pending]: (state,action)=>{
            state.status ='loading'
        },
        [getPosts.fulfilled] : (state,{payload})=>{
            state.posts = payload
            state.status = 'success'
        },
        [getPosts.rejected] : (state,action)=>{
            state.status = "failed"
        },
        [addPost.pending]: (state,action)=>{
            state.status ='loading'
        },
        [addPost.fulfilled]:(state,{payload})=>{

            state.posts.unshift(payload)
            state.status = "success"
        },
        [addPost.rejected]: (state,action)=>{
            state.status ='error'
        },
        [likePost.fulfilled] : (state,{payload})=>{
            const findPost = state.posts.findIndex((post)=>post._id === payload.postId)
            state.posts[findPost].like = payload.response
            
        },
        [addComment.fulfilled] :(state,{payload})=>{
            const findPost = state.posts.findIndex((post)=>post._id === payload.postId);
            state.posts[findPost].comments.unshift(payload.response)
        }


    }
})

export const {uploadPost} = postSlice.actions
export default postSlice.reducer