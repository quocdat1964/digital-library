import { createSlice } from "@reduxjs/toolkit";
import avt from '../../assets/avt_nqd.jpg'
const authInitialState = {
    isAuthenticated: true,
    user: null,
    token: null,
    status: 'idle',
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        loginStart(state, action) {
            state.status = 'loading'
            state.error = null
        },
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            state.status = 'succeeded';
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure(state, action) {
            state.isAuthenticated = false;
            state.status = 'failed';
            state.user = null;
            state.token = null
            state.error = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null
            state.status = 'idle';
            state.error = null;
        },
        validateToken(state){
            state.state = 'loading'
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    validateToken,
} = authSlice.actions

export const authReducer = authSlice.reducer