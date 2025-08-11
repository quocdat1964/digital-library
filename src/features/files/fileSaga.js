// Chỉnh instant update/add/delete sau

import { call, put, takeLatest, select, take, fork, cancel, all } from 'redux-saga/effects'
import fileService from '../../services/fileService';
import {
    fetchFiles,
    fetchFilesSuccess,
    fetchFilesFailure,
    fetchFilesByCollection,
    fetchFilesByCollectionFailure,
    fetchFilesByCollectionSuccess,
    fetchFilesByFolder,
    fetchFilesByFolderFailure,
    fetchFilesByFolderSuccess,
    deleteFile,
    deleteFileSuccess,
    deleteFileFailure,
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
} from "./fileSlice";
import { closeFileDetailPanel } from './fileDetailSlice';

import { loginSuccess, logout, setAuthFromLocalStorage } from '../auth/authSlice';
import toast from 'react-hot-toast';

function* handleFetchFiles() {
    try {
        const currentUser = yield select(state => state.auth.user)
        if (!currentUser) {
            console.log("Nothing here")
            yield put(fetchFilesSuccess([]))
            return
        }
        const files = yield call(fileService.getFilesByUploader, currentUser.userId)
        yield put(fetchFilesSuccess(files))
    } catch (error) {
        yield put(fetchFilesFailure(error.message))
    }
}

function* handleFetchFilesByFolder(action) {
    try {
        const folderId = action.payload
        if (!folderId) {
            yield put(fetchFilesByFolderSuccess([]))
            return
        }
        const files = yield call(fileService.getFilesByFolder, folderId)
        yield put(fetchFilesByFolderSuccess(files))
    } catch (error) {
        yield put(fetchFilesByFolderFailure(error.message))
    }
}

function* handleFetchFilesByCollection(action) {
    try {
        const collectionId = action.payload
        if (!collectionId) {
            yield put(fetchFilesByCollectionSuccess([]))
            return
        }
        const files = yield call(fileService.getFilesInCollection, collectionId)
        yield put(fetchFilesByCollectionSuccess(files))
    } catch (error) {
        yield put(fetchFilesByCollectionFailure(error.message))
    }
}

function* handleUploadAndSaveFile(action) {
    try {
        const { fileObject, name, description, author, folderId, uploaderId, thumbnailUrl } = action.payload

        const formData = new FormData()
        formData.append('file', fileObject)
        formData.append('title', name)
        formData.append('description', description)
        formData.append('author', author)
        formData.append('folderId', folderId)
        formData.append('uploaderId', uploaderId)
        formData.append('thumbnailUrl', thumbnailUrl)
        
        const savedFile = yield call(fileService.uploadAndSaveFile, formData)
        toast.success("Upload file thành công")
        yield put(uploadAndSaveFileSuccess(savedFile))
        
        yield put(fetchFiles()) // Sửa lại sau

    } catch (error) {
        yield put(uploadAndSaveFileFailure(error.message))
        toast.error("Có lỗi:", error)
    }
}

function* handleDeleteFile(action) {
    const fileIdToDelete = action.payload
    try {
        const selectedFile = yield select(state => state.fileDetail.selectedFile)
        
        yield call(fileService.deleteFile, fileIdToDelete)
        yield put(deleteFileSuccess(fileIdToDelete))
        toast.success("Xóa file thành công")
        
        if (selectedFile && selectedFile.fileId === fileIdToDelete) {
            yield put(closeFileDetailPanel())
        }
    } catch (error) {
        yield put(deleteFileFailure({ fileId: fileIdToDelete, error: error.message })); // Reducer deleteFileFailure sẽ khôi phục file
        toast.error(`Xóa file thất bại: ${error.message || String(error)}`);
    }
}

function* handleDeleteMultipleFiles(action) {
    const fileIdsToDelete = action.payload; // Mảng các fileId
    const selectedFile = yield select(state => state.fileDetail.selectedFile);

    try {
        const results = yield all(
            fileIdsToDelete.map(id => 
                call(function*() {
                    try {
                        yield call(fileService.deleteFile, id);
                        return { id: id, status: 'fulfilled' };
                    } catch (e) {
                        return { id: id, status: 'rejected', error: e.message };
                    }
                })
            )
        );

        const failedDeletions = results.filter(result => result.status === 'rejected');
        const successfulDeletions = results.filter(result => result.status === 'fulfilled');

        if (failedDeletions.length > 0) {
            const failedFileIds = failedDeletions.map(f => f.id);
            yield put(deleteMultipleFilesFailure({ fileIds: failedFileIds, error: "Một số file không thể xóa." }));
            toast.error(`Xóa một số file thất bại. Vui lòng thử lại.`);
        } else {
            yield put(deleteMultipleFilesSuccess(fileIdsToDelete));
            toast.success("Xóa các file đã chọn thành công!");
        }
        if (selectedFile && fileIdsToDelete.includes(selectedFile.fileId)) {
            yield put(closeFileDetailPanel());
        }
    } catch (error) {
        yield put(deleteMultipleFilesFailure({ fileIds: fileIdsToDelete, error: error.message || String(error) }));
        toast.error(`Xóa các file đã chọn thất bại: ${error.message || String(error)}`);
    }
}

function* handleAddFileToCollection(action){
    try {
        const {fileId, collectionId} = action.payload
        yield call(fileService.addFileToCollection, fileId, collectionId)
        yield put(addFileToCollectionSuccess())
        toast.success("Thêm file vào bộ sưu tập thành công")
    } catch (error) {
        yield put(addFileToCollectionFailure(error.message))
        toast.error("Có lỗi khi thêm file vào bộ sưu tập")
    }
}

function* handleRemoveFileFromCollection(action){
    try {
        const {fileId, collectionId} = action.payload
        yield call(fileService.removeFileFromCollection, fileId, collectionId)
        yield put(removeFileFromCollectionSuccess())
        toast.success("Xóa file khỏi bộ sưu tập thành công")
    } catch (error) {
        yield put(removeFileFromCollectionFailure(error.message))        
        toast.error("Lỗi khi xóa file khỏi bộ sưu tập")
    }
}

function* authenticatedFileTasks() {
    yield all([
        takeLatest(fetchFiles.type, handleFetchFiles),
        takeLatest(fetchFilesByFolder.type, handleFetchFilesByFolder),
        takeLatest(fetchFilesByCollection.type, handleFetchFilesByCollection),
        takeLatest(uploadAndSaveFile.type, handleUploadAndSaveFile),
        takeLatest(deleteFile.type, handleDeleteFile),
        takeLatest(deleteMultipleFiles.type, handleDeleteMultipleFiles),
        takeLatest(addFileToCollection.type, handleAddFileToCollection),
        takeLatest(removeFileFromCollection.type, handleRemoveFileFromCollection)
    ])
}

// Saga chính để quản lý luồng đăng nhập/đăng xuất
export function* watchFileSagas() {
    while (true) {
        // Chờ các action xác nhận user đã đăng nhập, kể cả từ localStorage
        yield take([loginSuccess.type, setAuthFromLocalStorage.type]);
        console.log("User authentication detected. Starting file tasks...");
        
        // Fetch files sau khi có user
        yield call(handleFetchFiles);
        // Fork saga con để lắng nghe các tác vụ liên quan đến file
        const fileTasks = yield fork(authenticatedFileTasks);

        // Chờ action logout
        yield take(logout.type);
        console.log("Logout detected. Cancelling file tasks...");

        // Khi đăng xuất, hủy tất cả các tác vụ liên quan đến file và quay lại vòng lặp
        yield cancel(fileTasks);
        yield put(fetchFilesSuccess([])); // Xóa files state khi logout
    }
}