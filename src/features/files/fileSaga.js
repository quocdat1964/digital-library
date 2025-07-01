import { call, put, takeLatest, select, take } from 'redux-saga/effects'
import { fileApi } from '../../api/fileApi';
import { 
    fetchFiles, 
    fetchFilesSuccess, 
    fetchFilesFailure,
    deleteFile,
    deleteFileSuccess,
    deleteFileFailure
} from "./fileSlice";
import { closeFileDetailPanel } from './fileDetailSlice';

function* handleFetchFiles() {
    try {
        const files = yield call(fileApi.fetchFiles)
        yield put(fetchFilesSuccess(files))
    } catch (error) {
        yield put(fetchFilesFailure(error.message))
    }
}

function* handleDeleteFile(action){
    try {
        const fileIdToDelete = action.payload
        const selectedFile = yield select(state=>state.fileDetail.selectedFile)
        yield call(fileApi.deleteFile, fileIdToDelete)
        yield put(deleteFileSuccess())
        if(selectedFile && selectedFile.id === fileIdToDelete){
            yield put(closeFileDetailPanel())
        }
        yield put(fetchFiles())
    } catch (error) {
        yield put(deleteFileFailure(error.message))
    }
}

export function* watchFetchFiles() {
    yield takeLatest(fetchFiles.type, handleFetchFiles)
    yield takeLatest(deleteFile.type, handleDeleteFile)
}