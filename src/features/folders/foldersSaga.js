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
    deleteFolderFailure
} from './foldersSlice'

function* handleFetchFolders() {
    try {
        const folders = yield call(folderApi.fetchFolders)
        console.log("Check folder: ", folders)
        yield put(fetchFoldersSuccess(folders))
    } catch (error) {
        yield put(fetchFoldersFailure(error.message))
    }
}

function* handleCreateFolder(action) {
    try {
        const folderData = action.payload
        yield call(folderApi.createFolder, folderData)
        yield put(createFolderSuccess(folderData))
        yield put(fetchFolders) //Chỗ này sẽ sửa lại thành instant add chứ không dùng như này nữa
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
    } catch (error) {
        
    }
}

export function* watchFolders() {
    yield takeLatest(fetchFolders.type, handleFetchFolders)
    yield takeLatest(createFolder.type, handleCreateFolder)
    yield takeLatest(updateFolder.type, handleUpdateFolder)
    yield takeLatest(deleteFolder.type, handleDeleteFolder)

}