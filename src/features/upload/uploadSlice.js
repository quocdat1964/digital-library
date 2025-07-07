import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    progress: 0,
    totalFiles: 0,
    uploadedCount: 0,
    error: null,
}

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        uploadFiles(state, action){
            state.status = 'uploading'
            state.totalFiles = action.payload.length
            state.uploadedCount = 0
            state.progress = 0
            state.error = null
        },
        updateUploadProgress(state,action){
            state.uploadedCount = action.payload.uploadedCount
            state.progress = (state.uploadedCount / state.totalFiles) * 100
        },
        uploadFilesSuccess(state){
            state.status = 'succeeded'
            state.progress = 100
        },
        uploadFilesFailure(state, action){
            state.status = 'failed'
            state.error = action.payload
        },
        resetUploadState(state){
            Object.assign(state, initialState)
        }
    }
})

export const {
    uploadFiles,
    updateUploadProgress,
    uploadFilesSuccess,
    uploadFilesFailure,
    resetUploadState
} = uploadSlice.actions

export default uploadSlice.reducer