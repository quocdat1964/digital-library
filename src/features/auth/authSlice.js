import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
    isAuthenticated: false,
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
            state.user = {
                userId: action.payload.userId,
                role: action.payload.role,
                email: action.payload.email,
                name: action.payload.name,
            };
            state.token = action.payload.token;
            state.error = null;
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
        setAuthFromLocalStorage(state, action){
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = !!action.payload.token;
            state.status = 'succeeded';
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setAuthFromLocalStorage
} = authSlice.actions

export const authReducer = authSlice.reducer