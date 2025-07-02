import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    folderList: [],
    status: 'idle',
    error: null
}

const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        fetchFolders(state) {
            state.status = 'loading'
        },
        fetchFoldersSuccess(state, action) {
            state.status = 'succeeded'
            state.folderList = action.payload
        },
        fetchFoldersFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },

        createFolder(state, action) {
            // có thể add tạm folder vào luôn
        },
        createFolderSuccess(state, action) {
            state.folderList.push(action.payload)
        },
        createFolderFailure(state, action) {
            state.error = action.payload
            // lỗi thì xóa bỏ ở hàm này sau
        },
        updateFolder(state, action) {
            state.updateStatus = 'loading';
            state.error = null;
        },
        updateFolderSuccess(state) {
            state.updateStatus = 'succeeded';
        },
        updateFolderFailure(state, action) {
            state.updateStatus = 'failed';
            state.error = action.payload;
        },
        deleteFolder(state, action) {
            state.status = 'loading';
            state.error = null;
        },
        deleteFolderSuccess(state) {
            
        },
        deleteFolderFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
})

export const {
    fetchFolders,
    fetchFoldersSuccess,
    fetchFoldersFailure,
    createFolder,
    createFolderSuccess,
    createFolderFailure,
    updateFolder,
    updateFolderSuccess,
    updateFolderFailure,
    deleteFolder,
    deleteFolderSuccess,
    deleteFolderFailure
} = foldersSlice.actions

export default foldersSlice.reducer