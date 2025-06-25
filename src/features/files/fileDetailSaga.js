import { call, put, takeLatest } from "redux-saga/effects";
import { fileApi } from "../../api/fileApi";
import {
    fetchFileDetails,
    fetchFileDetailsSuccess,
    fetchFileDetailsFailure,
    updateFileDetails,
    updateFileDetailsSuccess,
    updateFileDetailsFailure
} from './fileDetailSlice'

function* handleFetchFileDetails(action){
    try {
        const fileId = action.payload
        const fileDetails = yield call(fileApi.fetchFileDetails, fileId)
        yield put(fetchFileDetailsSuccess(fileDetails))
    } catch (error) {
        yield put(fetchFileDetailsFailure(error.message))
    }
}

function* handleUpdateFileDetails(action){
    try {
        const updatedFileData = action.payload
        const response = yield call(fileApi.updateFileDetails, updatedFileData)
        yield put(updateFileDetailsSuccess(response))
    } catch (error) {
        yield put(updateFileDetailsFailure(error.message))
    }
}

export function* watchFileDetail(){
    yield takeLatest(fetchFileDetails.type, handleFetchFileDetails)
    yield takeLatest(updateFileDetails.type, handleUpdateFileDetails)
}