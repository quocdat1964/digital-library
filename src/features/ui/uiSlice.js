import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
    isSidebarOpen: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: uiInitialState,
    reducers:{
        toggleSidebar(state){
            state.isSidebarOpen = !state.isSidebarOpen
        }
    }
})

export const {
    toggleSidebar
} = uiSlice.actions

export default uiSlice.reducer