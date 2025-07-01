import { createSlice } from "@reduxjs/toolkit";
import avt from '../../assets/avt_nqd.jpg'
const authInitialState = {
    isAuthenticated: false,
    user: null,
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
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.isAuthenticated = false;
            state.status = 'failed';
            state.user = null;
            state.error = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.status = 'idle';
            state.error = null;
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout
} = authSlice.actions

export const authReducer = authSlice.reducer