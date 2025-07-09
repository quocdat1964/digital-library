import { all, fork } from 'redux-saga/effects';
import { watchFetchFiles } from '../features/files/fileSaga';
import { watchFileDetail } from '../features/files/fileDetailSaga';
import { watchLogin } from '../features/auth/authSaga';
import { watchFolders } from '../features/folders/foldersSaga';
import { watchCollections } from '../features/collections/collectionSaga';
import { watchUploads } from '../features/upload/uploadSaga';
import { watchUsers } from '../features/users/userSaga';

export default function* rootSaga() {
    yield all([
        watchFetchFiles(),
        watchFileDetail(),
        watchLogin(),
        watchFolders(),
        watchCollections(),
        watchUploads(),
        watchUsers(),
    ]);
}
