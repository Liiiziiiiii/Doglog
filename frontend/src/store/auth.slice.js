import axios from 'axios';
import { API_URL } from "../http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";

export const login = createAsyncThunk(
    'authSlice/login',
    async ({ email, password }) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);

            return response;

        } catch (e) {
            console.log(e);
        }
    }
);

export const registration = createAsyncThunk(
    'authSlice/registration',
    async ({ first_name, last_name, email, password }) => {
        try {
            const response = await AuthService.registration(first_name, last_name, email, password);
            localStorage.setItem('token', response.data.accessToken);

            return response;

        } catch (e) {
            console.log(e);
        }
    }
);

export const logout = createAsyncThunk(
    'authSlice/logout',
    async () => {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');

            return response;

        } catch (e) {
            console.log(e);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'authSlice/checkAuth',
    async () => {
        try {
            // const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.data.accessToken);

            return response;

        } catch (e) {
            console.log(e);
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        isAuth: false,
        user: {},
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.isAuth = true;
                state.user = action.payload.data.user;
            })
            .addCase(login.rejected, (state, action) => {
                console.log(state);
                console.log(action.payload);
            })
            .addCase(registration.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.isAuth = true;
                state.user = action.payload.data.user;
            })
            .addCase(registration.rejected, (state, action) => {
                console.log(state);
                console.log(action.payload);
            })
            .addCase(logout.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'fulfilled';
                state.isAuth = false;
                state.user = {};
            })
            .addCase(logout.rejected, (state, action) => {
                console.log(state);
                console.log(action.payload);
            })
            .addCase(checkAuth.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.isAuth = true;
                state.user = action.payload.data.user;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                console.log(state);
                console.log(action.payload);
            });
    },
});

const authReducer = authSlice.reducer;

export default authReducer;
