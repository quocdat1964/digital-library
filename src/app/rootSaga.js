import { all, fork } from 'redux-saga/effects';
import { watchFetchFiles } from '../features/files/fileSaga';
import { watchFileDetail } from '../features/files/fileDetailSaga';

export default function* rootSaga() {
    yield all([
        watchFetchFiles(),
        watchFileDetail()
    ]);
}
