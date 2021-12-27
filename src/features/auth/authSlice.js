import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/constants";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {loading: "idle", user};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggingIn(state, action) {
            state.loading = 'loading'
        },
        registrationSuccess(state, action) {
            state.loading = 'idle'
            state.user = action.payload
        },
        registrationFailure(state, action) {
            state.loading = 'idle'
            state.user = null
        },
        loginSuccess(state, action) {
            state.user = action.payload
            state.loading = 'idle'

        },
        loginFailure(state, action) {
            state.user = null
            state.loading = 'idle'

        },
        logout(state, action) {
            state.loading = 'idle'
            state.user = null

        }
    }
})

export const { userLoggingIn, registrationSuccess, registrationFailure, loginSuccess, loginFailure, logout } = authSlice.actions

export default authSlice.reducer

export const registerUser = (username, password) => async (dispatch) => {
    dispatch(userLoggingIn())
    axios.post(API_URL + 'auth/signup', { username, password })
        .then((data) => {
            console.log(data)
        })
        .catch((err, data) => {
            console.log(err.response.data)
        })
    // console.log(response.data)
}
export const logUserIn = (username, password) =>  (dispatch) => {
    dispatch(userLoggingIn())
    return axios.post(API_URL + 'auth/signin', { username, password })
    .then((response)=> {
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data))
        }
    })
    .catch((err)=>{
        console.log(err.response.data)
    })
}

export const logUserOut = () => (dispatch) => {
    localStorage.removeItem("user")
    dispatch(logout())
}
export const getRequestHeaders = (multipart = false)=> {
    // This feels redundant... I make the same exact call at the start of this file. Question is, should this live here? or in another file? 
    // If I use the call at the start of the file, it is only initialized the one time. I should be using the state user here right? 
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    if(userFromStorage && userFromStorage.accessToken){
        if(multipart){
            return {'x-access-token': user.accessToken}
            // return {'x-access-token': user.accessToken, 'Content-Type':'multipart/form-data'}
        }else
        return {'x-access-token': user.accessToken}
    }else{
        return {}
    }
}
