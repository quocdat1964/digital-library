import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collectionList: [],
    currentCollection: null,
    status: 'idle',
    updateStatus: 'idle',
    error: null,
    _backupCollectionList: null,     // backup khi update/delete
    _backupCurrentCollection: null
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

        createCollection: (state) => {
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

        // ⬇ Optimistic update
        updateCollection: (state, action) => {
            state.updateStatus = 'loading'
            state.error = null

            const updatedCollection = action.payload
            // Backup dữ liệu trước khi thay đổi
            state._backupCollectionList = [...state.collectionList]
            state._backupCurrentCollection = state.currentCollection ? { ...state.currentCollection } : null

            const index = state.collectionList.findIndex(c => c.collectionId === updatedCollection.collectionId)
            if (index !== -1) {
                state.collectionList[index] = updatedCollection
            }
            if (state.currentCollection?.collectionId === updatedCollection.collectionId) {
                state.currentCollection = updatedCollection
            }
        },
        updateCollectionSuccess: (state) => {
            state.updateStatus = 'succeeded'
            // Xoá backup nếu thành công
            state._backupCollectionList = null
            state._backupCurrentCollection = null
        },
        updateCollectionFailure: (state, action) => {
            state.updateStatus = 'failed'
            state.error = action.payload
            // Rollback dữ liệu cũ
            if (state._backupCollectionList) state.collectionList = state._backupCollectionList
            if (state._backupCurrentCollection) state.currentCollection = state._backupCurrentCollection
            state._backupCollectionList = null
            state._backupCurrentCollection = null
        },

        // ⬇ Optimistic delete
        deleteCollection: (state, action) => {
            state.updateStatus = 'loading'
            state.error = null

            const deletedId = action.payload
            // Backup dữ liệu
            state._backupCollectionList = [...state.collectionList]
            state._backupCurrentCollection = state.currentCollection ? { ...state.currentCollection } : null

            state.collectionList = state.collectionList.filter(c => c.collectionId !== deletedId)
            if (state.currentCollection?.collectionId === deletedId) {
                state.currentCollection = null
            }
        },
        deleteCollectionSuccess: (state) => {
            state.updateStatus = 'succeeded'
            // Xoá backup
            state._backupCollectionList = null
            state._backupCurrentCollection = null
        },
        deleteCollectionFailure: (state, action) => {
            state.updateStatus = 'failed'
            state.error = action.payload
            // Rollback
            if (state._backupCollectionList) state.collectionList = state._backupCollectionList
            if (state._backupCurrentCollection) state.currentCollection = state._backupCurrentCollection
            state._backupCollectionList = null
            state._backupCurrentCollection = null
        },

        fetchCollectionDetails(state) {
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
