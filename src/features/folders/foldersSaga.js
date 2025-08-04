import { call, put, takeLatest } from 'redux-saga/effects'
import folderService from '../../services/folderService'
import {
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
} from './foldersSlice'

function* handleFetchFolders() {
    try {
        const folders = yield call(folderService.getAllFolders)
        yield put(fetchFoldersSuccess(folders))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi lấy danh sách folders.";
        yield put(fetchFoldersFailure(errorMessage));
    }
}

function* handleCreateFolder(action) {
    try {
        const newFolder = yield call(folderService.createFolder, action.payload)
        yield put(createFolderSuccess(newFolder))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi tạo folder mới.";
        yield put(createFolderFailure(errorMessage));
    }
}

function* handleUpdateFolder(action) {
    try {
        const folderData = action.payload
        const updatedFolder = yield call(folderService.updateFolder, folderData.folderId, {name: folderData.name, isPublic: folderData.isPublic})
        yield put(updateFolderSuccess(updatedFolder))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật folder.";
        yield put(updateFolderFailure(errorMessage));
    }
}

function* handleDeleteFolder(action) {
    try {
        const folderId = action.payload
        const response = yield call(folderService.deleteFolder, folderId);
        yield put(deleteFolderSuccess(folderId));
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi xóa folder.";
        yield put(deleteFolderFailure(errorMessage));
    }
}

// Chỗ này nên là getFilesByFolder
function* handleFetchFolderDetails(action) {
    try {
        const folderId = action.payload
        const folderDetails = yield call(folderService.getFolderById, folderId)
        yield put(fetchFolderDetailsSuccess(folderDetails))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi lấy chi tiết folder.";
        yield put(fetchFolderDetailsFailure(errorMessage));
    }
}

export function* watchFolders() {
    yield takeLatest(fetchFolders.type, handleFetchFolders)
    yield takeLatest(createFolder.type, handleCreateFolder)
    yield takeLatest(updateFolder.type, handleUpdateFolder)
    yield takeLatest(deleteFolder.type, handleDeleteFolder)
    yield takeLatest(fetchFolderDetails.type, handleFetchFolderDetails)
}