import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
    isAuthenticated: true,
    user: {
        name: 'NGUYỄN QUỐC ĐẠT',
        avatarUrl: 'https://placehold.co/40x40/EFEFEF/333?text=A'
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers:{
        logout(state){
            state.isAuthenticated = false,
            state.user = null
        }
    }
})

export const {
    logout
} = authSlice.actions

export const authReducer = authSlice.reducer