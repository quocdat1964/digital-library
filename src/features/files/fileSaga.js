import { call, put, takeLatest } from 'redux-saga/effects'
import { fileApi } from '../../api/fileApi';
import { fetchFiles, fetchFilesSuccess, fetchFilesFailure } from "./fileSlice";
import { format } from 'date-fns'

function* handleFetchFiles() {
    try {
        const files = yield call(fileApi.fetchFiles)
        console.log("Dunno: ", new Date(files[0].createAt))
        console.log("Dunno2: ", new Date())
        const groupedFiles = files.reduce((acc, file) => {
            console.log("hehehe")
            const dateKey = format(new Date(), 'dd/MM/yyyy')
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