import { call, put, takeLatest } from "redux-saga/effects";
import fileService from "../../services/fileService";
import {
    fetchFileDetails,
    fetchFileDetailsSuccess,
    fetchFileDetailsFailure,
    updateFileDetails,
    updateFileDetailsSuccess,
    updateFileDetailsFailure,
    fetchFilePreview,
    fetchFilePreviewSuccess,
    fetchFilePreviewFailure
} from './fileDetailSlice'

function* handleFetchFileDetails(action) {
    try {
        const fileId = action.payload
        const fileDetails = yield call(fileService.getFileById, fileId)
        yield put(fetchFileDetailsSuccess(fileDetails))
    } catch (error) {
        yield put(fetchFileDetailsFailure(error.message))
    }
}

function* handleUpdateFileDetails(action) {
    try {
        
        const { fileId, title, description, author, thumbnailUrl, folderId } = action.payload
        const response = yield call(fileService.updateFile, fileId, {title: title, description: description, author: author, thumbnailUrl: thumbnailUrl, folderId: folderId})
        yield put(updateFileDetailsSuccess(response))
    } catch (error) {
        yield put(updateFileDetailsFailure(error.message))
    }
}

function* handleFetchFilePreview(action) {
    try {
        const { storagePath, fileType } = action.payload
        const fileUrl = yield call(fileService.viewFile, storagePath, fileType)
        yield put(fetchFilePreviewSuccess(fileUrl))
    } catch (error) {
        yield put(fetchFilePreviewFailure(error.message))
    }
}

export function* watchFileDetail() {
    yield takeLatest(fetchFileDetails.type, handleFetchFileDetails)
    yield takeLatest(updateFileDetails.type, handleUpdateFileDetails)
    yield takeLatest(fetchFilePreview.type, handleFetchFilePreview)
}