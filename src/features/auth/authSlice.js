import { createSlice } from "@reduxjs/toolkit";
import avt from '../../assets/avt_nqd.jpg'
const authInitialState = {
    isAuthenticated: true,
    user: {
        name: 'NGUYỄN QUỐC ĐẠT',
        avatarUrl: avt
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