import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    posts : [
    ]
}

const postSlice = createSlice({
    name :"post",
    initialState,
    reducers : {
        uploadPost : (state,action)=>{
            return state
        }
    }
})

export const {uploadPost} = postSlice.actions
export default postSlice.reducer