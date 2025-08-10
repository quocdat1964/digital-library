import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    folderList: [],
    currentFolder: null,
    status: 'idle',
    updateStatus: 'idle',
    error: null,
    _backupFolderList: null,   // backup khi update/delete
    _backupCurrentFolder: null
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

        createFolder(state) {
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
        },

        // ⬇ Optimistic update
        updateFolder(state, action) {
            state.updateStatus = 'loading';
            state.error = null;

            const updatedFolder = action.payload;
            // Lưu backup trước khi thay đổi
            state._backupFolderList = [...state.folderList];
            state._backupCurrentFolder = state.currentFolder ? { ...state.currentFolder } : null;

            const index = state.folderList.findIndex(f => f.folderId === updatedFolder.folderId);
            if (index !== -1) {
                state.folderList[index] = updatedFolder;
            }
            if (state.currentFolder?.folderId === updatedFolder.folderId) {
                state.currentFolder = updatedFolder;
            }
        },
        updateFolderSuccess(state) {
            state.updateStatus = 'succeeded';
            // Xoá backup khi thành công
            state._backupFolderList = null;
            state._backupCurrentFolder = null;
        },
        updateFolderFailure(state, action) {
            state.updateStatus = 'failed';
            state.error = action.payload;
            // Khôi phục dữ liệu cũ
            if (state._backupFolderList) state.folderList = state._backupFolderList;
            if (state._backupCurrentFolder) state.currentFolder = state._backupCurrentFolder;
            state._backupFolderList = null;
            state._backupCurrentFolder = null;
        },

        // ⬇ Optimistic delete
        deleteFolder(state, action) {
            state.updateStatus = 'loading';
            state.error = null;

            const deletedId = action.payload;
            // Lưu backup
            state._backupFolderList = [...state.folderList];
            state._backupCurrentFolder = state.currentFolder ? { ...state.currentFolder } : null;

            state.folderList = state.folderList.filter(f => f.folderId !== deletedId);
            if (state.currentFolder?.folderId === deletedId) {
                state.currentFolder = null;
            }
        },
        deleteFolderSuccess(state) {
            state.updateStatus = 'succeeded';
            // Xoá backup
            state._backupFolderList = null;
            state._backupCurrentFolder = null;
        },
        deleteFolderFailure(state, action) {
            state.updateStatus = 'failed';
            state.error = action.payload;
            // Khôi phục dữ liệu
            if (state._backupFolderList) state.folderList = state._backupFolderList;
            if (state._backupCurrentFolder) state.currentFolder = state._backupCurrentFolder;
            state._backupFolderList = null;
            state._backupCurrentFolder = null;
        },

        fetchFolderDetails(state) {
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

export default foldersSlice.reducer;
