import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
    isSidebarOpen: true,
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