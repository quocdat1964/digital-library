import { call, put, takeLatest } from 'redux-saga/effects'
import { fileApi } from '../../api/fileApi';
import { fetchFiles, fetchFilesSuccess, fetchFilesFailure } from "./fileSlice";
import { format, parseISO } from 'date-fns'

function* handleFetchFiles() {
    try {
        const files = yield call(fileApi.fetchFiles)
        const groupedFiles = files.reduce((acc, file) => {
            const dateKey = format(parseISO(file.createdAt), 'dd/MM/yyyy')
            console.log("Check key: ", dateKey)
            if (!acc[dateKey]) {
                acc[dateKey] = []
            }
            acc[dateKey].push(file)
            return acc
        }, {})
        yield put(fetchFilesSuccess(groupedFiles))
    } catch (error) {
        yield put(fetchFilesFailure(error.message))
    }
}

export function* watchFetchFiles() {
    yield takeLatest(fetchFiles.type, handleFetchFiles)
}