import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import {toast} from "react-toastify"
export const getPosts = createAsyncThunk('post/getPosts',async ()=>{
    const response = await axios.get("post/all");
    return response.data.data
})

export const addPost = createAsyncThunk("post/add", async(postData)=>{
    const response = await axios.post("post/addPost",postData);
    return response.data.data
})

export const likePost = createAsyncThunk("post/like",async(postId)=>{
    const response = await axios.post(`post/like/${postId}`);
    return {response : response.data.data.like , postId : postId }
})

export const addComment = createAsyncThunk("post/comment",async({postId, commentText})=>{

    const response = await axios.post(`comment/${postId}/add`,{commentText : commentText});
    return {response : response.data.data.comment , postId : postId }
})

export const editPost = createAsyncThunk("post/edit",async({caption,postId})=>{
    const response = await axios.post(`/post/edit/${postId}`,{caption});
    return response.data.data

})

export const deleteComment = createAsyncThunk("/delete/comment",async(data)=>{
    await axios.delete(`comment/${data.postId}/delete/${data.commentId}`);
    return data

})


const initialState = {
    posts : [],
    status : 'loading'
}

const postSlice = createSlice({
    name :"post",
    initialState,
    reducers : {},
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
            toast.error("Something went wrong")
        },
        [addPost.pending]: (state,action)=>{
            state.status ='loading'
        },
        [addPost.fulfilled]:(state,{payload})=>{
            state.posts.unshift(payload)
            state.status = "success"
            toast.success("Post uploaded")
        },
        [addPost.rejected]: (state,action)=>{
            toast.error("Upload failed")
            state.status ='error'
        },
        [likePost.fulfilled] : (state,{payload})=>{
            const findPost = state.posts.findIndex((post)=>post._id === payload.postId)
            state.posts[findPost].like = payload.response
            
        },
        [addComment.fulfilled] :(state,{payload})=>{
            const findPost = state.posts.findIndex((post)=>post._id === payload.postId);
            state.posts[findPost].comments.unshift(payload.response);
            toast.success("Comment added")
        },
        [deleteComment.fulfilled]:(state,{payload})=>{
            const postIndex = state.posts.findIndex((post)=>post._id === payload.postId);
            const updatedPostComment = state.posts[postIndex].comments.filter(({_id})=>_id !==payload.commentId);
            state.posts[postIndex].comments = updatedPostComment
            toast.success("Comment removed")

            


        },
        [editPost.pending]:(state,action)=>{
            state.status ="loading"

        },
        [editPost.fulfilled]:(state,{payload})=>{
            
            const postIndex = state.posts.findIndex((post)=>post._id === payload._id);
            state.posts[postIndex].caption = payload.caption
            state.status ="success"
            toast.success("Post updated ")
        }
        


    }
})

export const {uploadPost} = postSlice.actions
export default postSlice.reducer