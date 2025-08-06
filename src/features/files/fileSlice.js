
import { createSlice } from "@reduxjs/toolkit";
import { format, parseISO } from 'date-fns'

const filterAndGroupFiles = (allFiles, searchTerm, fileTypeFilter) => {
    let filteredFiles = [...allFiles]
    if (fileTypeFilter && fileTypeFilter !== 'all') {
        const imgTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
        if (fileTypeFilter === 'image') {
            filteredFiles = filteredFiles.filter(file => imgTypes.includes(file.type?.toLowerCase()))
        } else {
            filteredFiles = filteredFiles.filter(file => file.type?.toLowerCase() === fileTypeFilter.toLowerCase())
        }
    }

    if (searchTerm) {
        filteredFiles = filteredFiles.filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return filteredFiles.reduce((acc, file) => {
        const dateKey = format(parseISO(file.uploadedAt), 'dd/MM/yyyy')
        if (!acc[dateKey]) {
            acc[dateKey] = []
        }
        acc[dateKey].push(file)
        return acc
    }, {})
}

const initialState = {
    allFiles: [],
    allFolderFiles: [],
    allCollectionFiles: [],
    filesByDate: {},
    filesByDateInFolder: {},
    filesByDateInCollection: {},
    selectedFileIds: [],
    status: 'idle',
    deleteStatus: 'idle',
    error: null,
    searchTerm: '',
    fileTypeFilter: 'all'
}

const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        fetchFiles(state) {
            state.status = 'loading'
            state.error = null
        },
        fetchFilesSuccess(state, action) {
            state.status = 'succeeded'
            state.allFiles = action.payload
            state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter)
        },
        fetchFilesFailure(state, action) {
            state.status = 'failed'
            state.error = action.payload
        },
        fetchFilesByFolder(state, action) {
            state.status = 'loading'
            state.error = null
        },
        fetchFilesByFolderSuccess(state, action) {
            state.status = 'succeeded'
            state.allFolderFiles = action.payload
            state.filesByDate = filterAndGroupFiles(state.allFolderFiles, state.searchTerm, state.fileTypeFilter)
        },
        fetchFilesByFolderFailure(state, action) {
            state.status = 'failed'
            state.error = action.payload
        },
        fetchFilesByCollection(state) {
            state.status = 'loading'
            state.error = null
        },
        fetchFilesByCollectionSuccess(state, action) {
            state.status = 'succeeded'
            state.allCollectionFiles = action.payload
            state.filesByDate = filterAndGroupFiles(state.allCollectionFiles, state.searchTerm, state.fileTypeFilter)
        },
        fetchFilesByCollectionFailure(state, action) {
            state.status = 'failed'
            state.error = action.payload
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload
            state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter)
        },
        setFileTypeFilter(state, action) {
            state.fileTypeFilter = action.payload
            state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter)
        },
        deleteFile(state, action) {
            state.deleteStatus = 'loading'
            state.error = null
        },
        deleteFileSuccess(state) {
            state.deleteStatus = 'succeeded'
            state.allFiles = state.allFiles.filter(file => file.fileId !== action.payload)
            state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter)
        },
        deleteFileFailure(state, action) {
            state.deleteStatus = 'failed'
            state.error = action.payload
        },
        toggleFileSelection(state, action) {
            const fileId = action.payload
            const selectedIndex = state.selectedFileIds.indexOf(fileId)
            if (selectedIndex >= 0) {
                state.selectedFileIds.splice(selectedIndex, 1)
            } else {
                state.selectedFileIds.push(fileId)
            }
        },
        clearFileSelection(state){
            state.selectedFileIds = []
        },
        deleteMultipleFiles(state, action){
            state.deleteStatus = 'loading'
            state.error = null
        },
        deleteMultipleFilesSuccess(state){
            state.deleteStatus = 'succeeded'
            const fileIdsToDelete = action.payload
            state.allFiles = state.allFiles.filter(file => !fileIdsToDelete.includes(file.fileId))
            state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter)
            state.selectedFileIds = []
        },
        deleteMultipleFilesFailure(state, action){
            state.deleteStatus = 'failed'
            state.error = action.payload
        },
        uploadAndSaveFile(state){
            state.status = 'loading'
            state.error = null
        },
        uploadAndSaveFileSuccess(state, action){
            state.status = 'succeeded'
            state.allFiles.push(action.payload)
            state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter)
        },
        uploadAndSaveFileFailure(state, action){
            state.status = 'failed'
            state.error = action.payload
        },
        addFileToCollection: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        addFileToCollectionSuccess: (state, action) => {
            state.status = 'succeeded';
            // const updatedFile = action.payload;
            // const index = state.files.findIndex(f => f.id === updatedFile.id);
            // if (index !== -1) {
            //     // Cập nhật file trong danh sách hiện tại
            //     state.files[index] = updatedFile;
            // }
        },
        addFileToCollectionFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        // Reducers mới để xử lý xóa file khỏi collection
        removeFileFromCollection: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        removeFileFromCollectionSuccess: (state, action) => {
            state.status = 'succeeded';
            // const { fileId, collectionId } = action.payload;
            // const file = state.files.find(f => f.id === fileId);
            // if (file) {
            //     // Lọc bỏ collectionId khỏi mảng collections của file
            //     file.collections = file.collections.filter(c => c !== collectionId);
            // }
        },
        removeFileFromCollectionFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    }
})

export const {
    fetchFiles,
    fetchFilesSuccess,
    fetchFilesFailure,
    fetchFilesByCollection,
    fetchFilesByCollectionFailure,
    fetchFilesByCollectionSuccess,
    fetchFilesByFolder,
    fetchFilesByFolderFailure,
    fetchFilesByFolderSuccess,
    setSearchTerm,
    setFileTypeFilter,
    deleteFile,
    deleteFileSuccess,
    deleteFileFailure,
    toggleFileSelection,
    clearFileSelection,
    deleteMultipleFiles,
    deleteMultipleFilesSuccess,
    deleteMultipleFilesFailure,
    uploadAndSaveFile,
    uploadAndSaveFileSuccess,
    uploadAndSaveFileFailure,
    addFileToCollection,
    addFileToCollectionFailure,
    addFileToCollectionSuccess,
    removeFileFromCollection,
    removeFileFromCollectionFailure,
    removeFileFromCollectionSuccess
} = fileSlice.actions

export default fileSlice.reducer