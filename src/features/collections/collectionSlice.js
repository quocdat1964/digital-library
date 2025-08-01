import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collectionList: [],
    currentCollection: null,
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
            state.updateStatus = 'loading'
        },
        createCollectionSuccess: (state, action) => {
            state.updateStatus = 'succeeded'
            const newCollection = action.payload
            state.collectionList.push(newCollection)
        },
        createCollectionFailure: (state, action) => {
            state.updateStatus = 'failed'
            state.error = action.payload
        },
        updateCollection: (state, action) => {
            state.updateStatus = 'loading'
        },
        updateCollectionSuccess: (state, action) => {
            state.updateStatus = 'succeeded'
            const updatedCollection = action.payload
            const index = state.collectionList.findIndex(c => c.collectionId === updatedCollection.collectionId)
            if (index !== -1) {
                state.collectionList[index] = updatedCollection
            }
            if(state.currentCollection?.collectionId === updatedCollection.collectionId){
                state.currentCollection = updatedCollection
            }
        },
        updateCollectionFailure: (state, action) => {
            state.updateStatus = 'failed'
            state.error = action.payload
        },
        deleteCollection: (state, action) => {
            state.updateStatus = 'loading'
        },
        deleteCollectionSuccess: (state, action) => {
            state.updateStatus = 'succeeded'
            const deletedId = action.payload
            state.collectionList = state.collectionList.filter(c => c.collectionId !== deletedId)
            if(state.currentCollection?.collectionId === deletedId){
                state.currentCollection = null
            }
        },
        deleteCollectionFailure: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        fetchCollectionDetails(state, action) {
            state.status = 'loading'
            state.currentCollection = null
        },
        fetchCollectionDetailsSuccess(state, action) {
            state.status = 'succeeded'
            state.currentCollection = action.payload
        },
        fetchCollectionDetailsFailure(state, action) {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})

export const {
    fetchCollections, fetchCollectionsFailure, fetchCollectionsSuccess,
    createCollection, createCollectionFailure, createCollectionSuccess,
    updateCollection, updateCollectionFailure, updateCollectionSuccess,
    deleteCollection, deleteCollectionFailure, deleteCollectionSuccess,
    fetchCollectionDetails, fetchCollectionDetailsFailure, fetchCollectionDetailsSuccess,
} = collectionSlice.actions

export default collectionSlice.reducer