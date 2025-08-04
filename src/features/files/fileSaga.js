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
    addFile,
    addFileSuccess,
    addFileFailure
} from "./fileSlice";
import { closeFileDetailPanel } from './fileDetailSlice';

import { loginSuccess, logout, setAuthFromLocalStorage } from '../auth/authSlice';

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
        // console.log("Check point")
        const files = yield call(fileService.getFilesInCollection, collectionId)
        // console.log("Check fileCollection:", files)
        yield put(fetchFilesByCollectionSuccess(files))
    } catch (error) {
        yield put(fetchFilesByCollectionFailure(error.message))
    }
}

function* handleAddFile(action) {
    try {
        const newFile = yield call(fileService.createFile, action.payload)
        yield put(addFileSuccess(newFile))
    } catch (error) {
        yield put(addFileFailure(error.message))
    }
}

function* handleDeleteFile(action) {
    try {
        const fileIdToDelete = action.payload
        const selectedFile = yield select(state => state.fileDetail.selectedFile)
        yield call(fileService.deleteFile, fileIdToDelete)
        yield put(deleteFileSuccess(fileIdToDelete))
        if (selectedFile && selectedFile.id === fileIdToDelete) {
            yield put(closeFileDetailPanel())
        }
    } catch (error) {
        yield put(deleteFileFailure(error.message))
    }
}

function* handleDeleteMultipleFiles(action) {
    try {
        const fileIds = action.payload
        // for (const id of fileIds) {
        //     yield call(fileService.deleteFile, id)
        // }
        yield all(fileIds.map(id => call((fileService.deleteFile, id))))
        yield put(deleteMultipleFilesSuccess(fileIds))

        const selectedFile = yield select(state => state.fileDetail.selectedFile)
        if (selectedFile && fileIds.includes(selectedFile.id)) {
            yield put(closeFileDetailPanel())
        }
        yield put(fetchFiles())
    } catch (error) {
        yield put(deleteMultipleFilesFailure(error.message))
    }
}

// export function* watchFetchFiles() {
//     yield takeLatest(fetchFiles.type, handleFetchFiles)
//     yield takeLatest(fetchFilesByFolder.type, handleFetchFilesByFolder)
//     yield takeLatest(fetchFilesByCollection.type, handleFetchFilesByCollection)
//     yield takeLatest(addFile.type, handleAddFile)
//     yield takeLatest(deleteFile.type, handleDeleteFile)
//     yield takeLatest(deleteMultipleFiles.type, handleDeleteMultipleFiles)
// }


function* authenticatedFileTasks() {
    yield all([
        yield takeLatest(fetchFiles.type, handleFetchFiles),
        yield takeLatest(fetchFilesByFolder.type, handleFetchFilesByFolder),
        yield takeLatest(fetchFilesByCollection.type, handleFetchFilesByCollection),
        yield takeLatest(addFile.type, handleAddFile),
        yield takeLatest(deleteFile.type, handleDeleteFile),
        yield takeLatest(deleteMultipleFiles.type, handleDeleteMultipleFiles),
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