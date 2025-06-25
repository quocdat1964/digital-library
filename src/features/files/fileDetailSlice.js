import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedFile: null,
    isPanelOpen: false,
    status: 'idle',
    error: null
}

const fileDetailSlice = createSlice({
    name: 'fileDetail',
    initialState,
    reducers: {
        fetchFileDetails(state, action) {
            state.status = 'loading'
            state.isPanelOpen = true
            state.selectedFile = null
            state.error = null
        },
        fetchFileDetailsSuccess(state, action) {
            state.status = 'succeeded'
            state.selectedFile = action.payload
        },
        fetchFileDetailsFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        closeFileDetailPanel(state) {
            state.isPanelOpen = false;
            state.selectedFile = null;
            state.status = 'idle';
        },
        updateFileDetails(state, action) {
            state.status = 'updating';
        },
        updateFileDetailsSuccess(state, action) {
            state.status = 'succeeded';
            state.selectedFile = action.payload;
        },
        updateFileDetailsFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
})

export const {
    fetchFileDetails,
    fetchFileDetailsSuccess,
    fetchFileDetailsFailure,
    closeFileDetailPanel,
    updateFileDetails,
    updateFileDetailsSuccess,
    updateFileDetailsFailure

} = fileDetailSlice.actions

export default fileDetailSlice.reducer