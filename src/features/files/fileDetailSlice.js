// Thêm tính năng instant update sau(Để tạm để test trước, sau khi làm api thì tính tiếp)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedFile: null,
    isPanelOpen: false,
    status: 'idle',
    error: null,
    filePreviewUrl: null,
    previewStatus: 'idle',
    previewError: null
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
            state.filePreviewUrl = null; // Reset URL khi đóng panel
            state.previewStatus = 'idle';
            state.previewError = null;
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
        },
        fetchFilePreview(state, action){
            state.previewStatus = 'loading'
            state.filePreviewUrl = null
            state.previewError = null
        },
        fetchFilePreviewSuccess(state, action){
            state.previewStatus = 'succeeded'
            state.filePreviewUrl = action.payload
        },
        fetchFilePreviewFailure(state, action){
            state.previewStatus = 'failed'
            state.previewError = action.payload
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
    updateFileDetailsFailure,
    fetchFilePreview,
    fetchFilePreviewSuccess,
    fetchFilePreviewFailure

} = fileDetailSlice.actions

export default fileDetailSlice.reducer