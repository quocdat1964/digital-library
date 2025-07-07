import { call, put, takeLatest, all } from 'redux-saga/effects'
import { fileApi } from '../../api/fileApi'
import { fetchFiles } from '../files/fileSlice'
import { fetchFolders } from '../folders/foldersSlice'
import {
    uploadFiles,
    updateUploadProgress,
    uploadFilesSuccess,
    uploadFilesFailure
} from './uploadSlice'

function* handleUploadFiles(action) {
    try {
        const filesToUpload = action.payload
        const totalFiles = filesToUpload.length

        for (let i = 0; i < totalFiles; i++) {
            const fileData = filesToUpload[i]
            yield call(fileApi.uploadFile, fileData)
            yield put(updateUploadProgress({ uploadedCount: i + 1 }))
        }

        yield put(uploadFilesSuccess())

        // 2 chỗ này sau khi làm api sẽ đổi lại để auto cập nhật luôn, rồi lỗi thì phục hồi lại sau
        yield put(fetchFiles())
        yield put(fetchFolders())
    } catch (error) {
        yield put(uploadFilesFailure(error.message))
    }
}

export function* watchUploads(){
    yield takeLatest(uploadFiles.type, handleUploadFiles)
}