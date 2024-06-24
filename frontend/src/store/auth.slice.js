import axios from 'axios';
import {API_URL} from "../http";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";


export const login = createAsyncThunk(
    'authSlice/login',
    async ({email, password})=>{
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)

            return response

        }catch (e){
            console.log(e)
        }
    }
)

export const registration = createAsyncThunk(
    'authSlice/login',
    async ({first_name, last_name, email, password})=>{
        try {
            const response = await AuthService.registration(first_name, last_name, email, password)
            localStorage.setItem('token', response.data.accessToken)

            return response

        }catch (e){
            console.log(e)
        }
    }
)

export const logout = createAsyncThunk(
    'authSlice/logout',
    async ()=>{
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')

            return response

        }catch (e){
            console.log(e)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'authSlice/checkAuth',
    async ()=>{
        try {
            // const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            const response = await AuthService.refresh()
            localStorage.setItem('token', response.data.accessToken);

            return response

        }catch (e){
            console.log(e)
        }
    }
)


const authSlice = createSlice( {
    name:'authSlice',
    initialState: {
        isAuth: false,
        user: {},
        weatherStationsData: [],


        status: null,
        error: null
    },
    reducers:{

    },
    extraReducers: {
        [login.pending]: (state, action) =>{
            state.status = 'pending'
            state.error = null
        },
        [login.fulfilled]: (state, action) =>{
            state.status = 'fulfilled'
            state.isAuth = true
            state.user = action.payload.data.user

        },
        [login.rejected]: (state, action) =>{
            console.log(state)
            console.log(action.payload)
        },


        [registration.pending]: (state, action) =>{
            state.status = 'pending'
            state.error = null
        },
        [registration.fulfilled]: (state, action) =>{
            state.status = 'fulfilled'
            state.isAuth = true
            state.user = action.payload.data.user

        },
        [registration.rejected]: (state, action) =>{
            console.log(state)
            console.log(action.payload)
        },





        [logout.pending]: (state, action) =>{
            state.status = 'pending'
            state.error = null
        },
        [logout.fulfilled]: (state, action) =>{
            state.status = 'fulfilled'
            state.isAuth = false
            state.user = {}

        },
        [logout.rejected]: (state, action) =>{
            console.log(state)
            console.log(action.payload)
        },


        [checkAuth.pending]: (state, action) =>{
            state.status = 'pending'
            state.error = null
        },
        [checkAuth.fulfilled]: (state, action) =>{
            state.status = 'fulfilled'
            state.isAuth = true
            state.user = action.payload.data.user

        },
        [checkAuth.rejected]: (state, action) =>{
            console.log(state)
            console.log(action.payload)
        },

    }
})



const authReducer = authSlice.reducer
// export const {ChangeTerm, ChangePage} = authSlice.actions

export default authReducer