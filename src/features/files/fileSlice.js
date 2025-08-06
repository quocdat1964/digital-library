
import { createSlice } from "@reduxjs/toolkit";
import { format, parseISO } from 'date-fns'
import toast from "react-hot-toast";

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
    fileTypeFilter: 'all',
    tempDeletedFiles: {}
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
        // DONE
        deleteFile: (state, action) => {
            const fileId = action.payload;
            const fileIndex = state.allFiles.findIndex(file => file.fileId === fileId);

            if (fileIndex !== -1) {
                const fileToDelete = state.allFiles[fileIndex];
                state.tempDeletedFiles[fileId] = { file: fileToDelete, originalIndex: fileIndex };
                state.allFiles.splice(fileIndex, 1);
                state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter);
                state.deleteStatus = 'loading';
                state.error = null;
            }
        },

        deleteFileSuccess: (state, action) => {
            state.deleteStatus = 'succeeded';
            delete state.tempDeletedFiles[action.payload];
        },

        deleteFileFailure: (state, action) => {
            const { fileId, error } = action.payload;
            const tempFileEntry = state.tempDeletedFiles[fileId];

            if (tempFileEntry) {
                // Chèn file vào đúng vị trí ban đầu
                state.allFiles.splice(tempFileEntry.originalIndex, 0, tempFileEntry.file);
                state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter);
                delete state.tempDeletedFiles[fileId];
            }
            state.deleteStatus = 'failed';
            state.error = error;
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
        clearFileSelection(state) {
            state.selectedFileIds = []
        },
        deleteMultipleFiles: (state, action) => {
            const fileIdsToDelete = action.payload; // Mảng các fileId
            const filesToRestore = {}; // Tạm thời lưu trữ các file và index của chúng

            state.allFiles = state.allFiles.filter(file => {
                if (fileIdsToDelete.includes(file.fileId)) {
                    // Lưu file và index của nó trước khi xóa
                    const originalIndex = state.allFiles.indexOf(file); // Tìm index trước khi filter
                    filesToRestore[file.fileId] = { file: file, originalIndex: originalIndex };
                    return false; // Loại bỏ file này khỏi allFiles
                }
                return true; // Giữ lại các file khác
            });

            // Cập nhật tempDeletedFiles với các file và index để khôi phục
            Object.assign(state.tempDeletedFiles, filesToRestore);

            state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter);
            state.selectedFileIds = []; // Xóa lựa chọn sau khi hành động
            state.deleteStatus = 'loading';
            state.error = null;
        },
        // UPDATED: deleteMultipleFilesSuccess chỉ cập nhật trạng thái
        deleteMultipleFilesSuccess: (state, action) => {
            state.deleteStatus = 'succeeded';
            const fileIds = action.payload;
            fileIds.forEach(fileId => {
                delete state.tempDeletedFiles[fileId]; // Xóa khỏi temp store khi thành công
            });
        },
        // UPDATED: deleteMultipleFilesFailure để khôi phục nhiều file vào đúng vị trí
        deleteMultipleFilesFailure: (state, action) => {
            const { fileIds, error } = action.payload; // Nhận mảng fileIds và lỗi

            // Khôi phục từng file về vị trí ban đầu
            fileIds.forEach(fileId => {
                const tempFileEntry = state.tempDeletedFiles[fileId];
                if (tempFileEntry) {
                    // Để chèn vào đúng vị trí, cần tạo một bản sao mới của mảng và chèn vào
                    // hoặc sắp xếp lại sau khi chèn tất cả.
                    // Cách đơn giản nhất là thêm lại và sau đó sắp xếp lại toàn bộ allFiles
                    // hoặc chèn từng cái một và đảm bảo không bị trùng lặp.
                    // Để giữ đúng index, chúng ta phải cẩn thận khi splice nhiều lần.
                    // Cách an toàn hơn là thêm lại tất cả và sau đó sắp xếp lại toàn bộ `allFiles`
                    // hoặc chèn vào vị trí gần đúng và sau đó sắp xếp lại.
                    // Với splice, nếu chèn nhiều lần, index sẽ thay đổi.
                    // Để giữ nguyên thứ tự ban đầu, ta sẽ thêm lại và sắp xếp lại toàn bộ.
                    state.allFiles.push(tempFileEntry.file);
                    delete state.tempDeletedFiles[fileId];
                }
            });
            // Sau khi thêm tất cả các file đã khôi phục, sắp xếp lại toàn bộ danh sách
            state.allFiles.sort((a, b) => parseISO(b.uploadedAt).getTime() - parseISO(a.uploadedAt).getTime());
            state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter);
            state.deleteStatus = 'failed';
            state.error = error;
        },
        // deleteMultipleFiles(state, action) {
        //     state.deleteStatus = 'loading'
        //     state.error = null
        // },
        // deleteMultipleFilesSuccess(state) {
        //     state.deleteStatus = 'succeeded'
        //     const fileIdsToDelete = action.payload
        //     state.allFiles = state.allFiles.filter(file => !fileIdsToDelete.includes(file.fileId))
        //     state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter)
        //     state.selectedFileIds = []
        // },
        // deleteMultipleFilesFailure(state, action) {
        //     state.deleteStatus = 'failed'
        //     state.error = action.payload
        // },
        uploadAndSaveFile(state) {
            state.status = 'loading'
            state.error = null
        },
        uploadAndSaveFileSuccess(state, action) {
            state.status = 'succeeded'
            state.allFiles.push(action.payload)
            state.filesByDate = filterAndGroupFiles(state.allFiles, state.searchTerm, state.fileTypeFilter)

        },
        uploadAndSaveFileFailure(state, action) {
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