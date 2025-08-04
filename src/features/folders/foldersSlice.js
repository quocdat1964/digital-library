import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    folderList: [],
    currentFolder: null,
    status: 'idle',
    updateStatus: 'idle',
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
            state.updateStatus = 'loading'
        },
        createFolderSuccess(state, action) {
            state.updateStatus = 'succeeded'
            const newFolder = action.payload
            state.folderList.push(newFolder)
        },
        createFolderFailure(state, action) {
            state.updateStatus = 'failed'
            state.error = action.payload
            // lỗi thì xóa bỏ ở hàm này sau
        },
        updateFolder(state, action) {
            state.updateStatus = 'loading';
            state.error = null;
        },
        updateFolderSuccess(state) {
            state.updateStatus = 'succeeded';
            const updatedFolder = action.payload
            const index = state.folderList.findIndex(f => f.folder === updatedFolder.folderId)
            if (index !== -1) {
                state.folderList[index] = updatedFolder
            }
            if (state.currentFolder?.folderId === updatedFolder.folderId) {
                state.currentFolder = updatedFolder;
            }
        },
        updateFolderFailure(state, action) {
            state.updateStatus = 'failed';
            state.error = action.payload;
        },
        deleteFolder(state, action) {
            state.updateStatus = 'loading';
            state.error = null;
        },
        deleteFolderSuccess(state) {
            state.updateStatus = 'succeeded'
            const deletedId = action.payload
            state.folderList = state.folderList.filter(f => f.folderId !== deletedId)
            if (state.currentFolder?.folderId === deletedId) {
                state.currentFolder = null
            }
        },
        deleteFolderFailure(state, action) {
            state.updateStatus = 'failed';
            state.error = action.payload;
        },
        fetchFolderDetails(state, action) {
            state.status = 'loading'
            state.currentFolder = null
        },
        fetchFolderDetailsSuccess(state, action) {
            state.status = 'succeeded';
            state.currentFolder = action.payload;
        },
        fetchFolderDetailsFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
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
    deleteFolderFailure,
    fetchFolderDetails,
    fetchFolderDetailsSuccess,
    fetchFolderDetailsFailure
} = foldersSlice.actions

export default foldersSlice.reducer