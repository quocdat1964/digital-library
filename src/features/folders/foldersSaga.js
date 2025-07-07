import { call, put, takeLatest } from 'redux-saga/effects'
import { folderApi } from '../../api/folderApi'
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
        const folders = yield call(folderApi.fetchFolders)
        yield put(fetchFoldersSuccess(folders))
    } catch (error) {
        yield put(fetchFoldersFailure(error.message))
    }
}

function* handleCreateFolder(action) {
    try {
        const folderData = action.payload
        yield call(folderApi.createFolder, folderData)
        yield put(createFolderSuccess())
        yield put(fetchFolders()) //Chỗ này sẽ sửa lại thành instant add chứ không dùng như này nữa
    } catch (error) {
        yield put(createFolderFailure(error.message))
    }
}

function* handleUpdateFolder(action){
    try {
        const folderData = action.payload
        yield call(folderApi.updateFolder, folderData)
        yield put(updateFolderSuccess())
        yield put(fetchFolders())
    } catch (error) {
        yield put(updateFolderFailure(error.message))
    }
}

function* handleDeleteFolder(action){
    try {
        const folderId = action.payload
        yield call(folderApi.deleteFolder, folderId)
        yield put(deleteFolderSuccess())
        yield put(fetchFolders())
    } catch (error) {
        yield put(deleteFolderFailure(error.message))        
    }
}

function* handleFetchFolderDetails(action){
    try {
        const folderId = action.payload
        const folderDetails = yield call(folderApi.fetchFolderDetails, folderId)
        yield put(fetchFolderDetailsSuccess(folderDetails))
    } catch (error) {
        yield put(fetchFolderDetailsFailure(error.message))
    }
}

export function* watchFolders() {
    yield takeLatest(fetchFolders.type, handleFetchFolders)
    yield takeLatest(createFolder.type, handleCreateFolder)
    yield takeLatest(updateFolder.type, handleUpdateFolder)
    yield takeLatest(deleteFolder.type, handleDeleteFolder)
    yield takeLatest(fetchFolderDetails.type, handleFetchFolderDetails)
}