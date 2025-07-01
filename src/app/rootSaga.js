import { all, fork } from 'redux-saga/effects';
import { watchFetchFiles } from '../features/files/fileSaga';
import { watchFileDetail } from '../features/files/fileDetailSaga';
import { watchLogin } from '../features/auth/authSaga';

export default function* rootSaga() {
    yield all([
        watchFetchFiles(),
        watchFileDetail(),
        watchLogin()
    ]);
}
