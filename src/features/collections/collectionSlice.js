import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collectionList: [],
    status: 'idle',
    updateStatus: 'idle',
    error: null
}

const collectionSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        fetchCollections: (state) => {
            state.status = 'loading'
        },
        fetchCollectionsSuccess: (state, action) => {
            state.status = 'succeeded'
            state.collectionList = action.payload
        },
        fetchCollectionsFailure: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        createCollection: (state, action) => {

        },
        createCollectionSuccess: (state, action) => {

        },
        createCollectionFailure: (state, action) => {
            state.error = action.payload
        },
        updateCollection: (state, action) => {
            state.updateStatus = 'loading'
        },
        updateCollectionSuccess: (state, action) => {
            state.updateStatus = 'succeeded'
        },
        updateCollectionFailure: (state, action) => {
            state.updateStatus = 'failed'
            state.error = action.payload
        },
        deleteCollection:(state,action)=>{
            state.status='loading'
        },
        deleteCollectionSuccess:(state,action)=>{

        },
        deleteCollectionFailure:(state,action)=>{
            state.status='failed'
            state.error=action.payload
        }
    }
})

export const {
    fetchCollections, fetchCollectionsFailure, fetchCollectionsSuccess,
    createCollection, createCollectionFailure, createCollectionSuccess,
    updateCollection, updateCollectionFailure, updateCollectionSuccess,
    deleteCollection, deleteCollectionFailure, deleteCollectionSuccess,
} = collectionSlice.actions

export default collectionSlice.reducer