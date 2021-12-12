import {createSlice , createAsyncThunk}  from "@reduxjs/toolkit";
import axios from 'axios'
import {toast} from "react-toastify"
const initialState = {
    user : [],
    otherUsers : [],
    otherUserProfile : {},
    status : 'loading',
    login : localStorage?.getItem('auth') ? true : false,

}

export const register = createAsyncThunk("/user/register",async(userData)=>{
    const response = await axios.post("/auth/register",userData);
    console.log(response.data.data.token);
    return response.data.data

})

export const login = createAsyncThunk("user/login",async(userData)=>{
    const response = await axios.post("/auth/login",userData);
    console.log(response.data.data.token)
    return response.data.data

})

export const fetchUser = createAsyncThunk("/user/detail",async()=>{
    const response = await axios.get("/user/userProfile");
    return response.data.data

})

export const allUsers = createAsyncThunk("/user/all",async()=>{
    const response = await axios.get("/user/all");
    console.log(response.data.data)
    return response.data.data
})

export const changeProfilePic = createAsyncThunk("/user/profile_pic",async(displayPic)=>{
    const response =  await axios.post("/user/changepic",{displayPic})
    return response.data.data
})




export const followUser = createAsyncThunk("user/follow",async({toFollow})=>{

    const response = await axios.post(`user/follow/${toFollow}`);
    return response.data.data

})

export const savePost = createAsyncThunk("post/save",async(postId)=>{
    console.log(postId)
    const response = await axios.post(`/post/save/${postId}`);
    console.log(response.data.data)
    return response.data.data
})




// export const seeProfile = createAsyncThunk("user/profile",async({userId})=>{
//     const response = await axios.get(`user/profile/${userId}`)
//     return response.data.data
// })
const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        logout : (state,action)=>{
            localStorage.removeItem('auth')
            state.login = false;
        }
    },
    extraReducers : {
        [register.pending]:(state,action)=>{
            state.status ="loading"
        },
        [register.fulfilled]:(state,{payload})=>{
            state.user = payload.data;
            state.login = true;
            localStorage.setItem("auth",JSON.stringify({token : payload.token , login : true}))
            state.status = "success"
        },
        [register.rejected]:(state,action)=>{
            state.status = "failed"
        },
        [login.pending]:(state,{payload})=>{
            state.status ="loading"
            
        },
        [login.fulfilled]:(state,{payload})=>{
            state.user = payload.data;
            state.login =true
            localStorage.setItem("auth",JSON.stringify({token : payload.token , login : true}))
            state.status = "success"
        },
        [login.rejected]:(state,{error})=>{
            console.log(error.message)
            state.status = "failed"
            toast.error("user not found")

        },
        [fetchUser.pending]:(state,action)=>{
            state.status ="loading"
        },
        [fetchUser.fulfilled]:(state,{payload})=>{
            state.user = payload;
            state.status = "success"
            state.login=true
        },
        [fetchUser.rejected]:(state,action)=>{
            state.status = "failed"
        },
        [changeProfilePic.pending]:(state,action)=>{
            state.status ="loading"
        },
        [changeProfilePic.fulfilled]:(state,{payload})=>{
            state.user.displayPic = payload.displayPic;
            state.status = "success"
        },
        [changeProfilePic.rejected]:(state,action)=>{
            state.status = "failed"
        },
        [allUsers.fulfilled]:(state,{payload})=>{
            state.otherUsers = payload;
        },
        [savePost.fulfilled]:(state,{payload})=>{
            console.log(payload)
            state.user.savePost = payload

        }
        
    }
})

export const {logout} = userSlice.actions
export default userSlice.reducer 



//   [seeProfile.pending]:(state,action)=>{
//             // state.status ="loading"
//         },
//         [seeProfile.fulfilled]:(state,{payload})=>{
//             console.log(payload)
//             state.otherUserProfile = payload
//             state.status = "success"
//         },
//         [seeProfile.rejected]:(state,action)=>{
//             state.status = "failed"
//         }