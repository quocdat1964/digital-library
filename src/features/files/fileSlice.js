// Thêm tính năng instant add/delete sau(Để tạm để test trước, sau khi làm api thì tính tiếp)

import { createSlice } from "@reduxjs/toolkit";
import { format, parseISO } from 'date-fns'

const filterAndGroupFiles = (allFiles, searchTerm, fileTypeFilter) => {
    let filteredFiles = [...allFiles]

    if (fileTypeFilter && fileTypeFilter !== 'all') {
        const imgTypes = ['jpg', 'jpeg', 'png', 'gif']
        if (fileTypeFilter === 'image') {
            filteredFiles = filteredFiles.filter(file => imgTypes.includes(file.type.toLowerCase()))
        } else {
            filteredFiles = filteredFiles.filter(file => file.type.toLowerCase() === fileTypeFilter.toLowerCase())
        }
    }

    if (searchTerm) {
        filteredFiles = filteredFiles.filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return filteredFiles.reduce((acc, file) => {
        const dateKey = format(parseISO(file.createdAt), 'dd/MM/yyyy')
        console.log("Check key: ", dateKey)
        if (!acc[dateKey]) {
            acc[dateKey] = []
        }
        acc[dateKey].push(file)
        return acc
    }, {})
}

const initialState = {
    allFiles: [],
    filesByDate: {},
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
        },
        deleteFileFailure(state, action) {
            state.deleteStatus = 'failed'
            state.error = action.payload
        }
    }
})

export const {
    fetchFiles,
    fetchFilesSuccess,
    fetchFilesFailure,
    setSearchTerm,
    setFileTypeFilter,
    deleteFile,
    deleteFileSuccess,
    deleteFileFailure
} = fileSlice.actions

export default fileSlice.reducer