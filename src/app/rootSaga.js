import { all, fork } from 'redux-saga/effects';
import { watchFetchFiles } from '../features/files/fileSaga';


export default function* rootSaga() {
    yield all([
        watchFetchFiles(),
    ]);
}
