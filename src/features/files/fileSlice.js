import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filesByDate: {},
    status: 'idle',
    error: null,
}

const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers:{
        fetchFiles(state){
            state.status = 'loading',
            state.error = null
        },
        fetchFilesSuccess(state, action){
            state.status = 'succeeded',
            state.filesByDate = action.payload
        },
        fetchFilesFailure(state, action){
            state.status = 'failed',
            state.error = action.payload
        }
    }
})

export const {
    fetchFiles,
    fetchFilesSuccess,
    fetchFilesFailure
} = fileSlice.actions

export default fileSlice.reducer