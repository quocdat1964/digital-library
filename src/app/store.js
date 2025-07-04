import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

import uiReducer from '../features/ui/uiSlice'
import { authReducer } from '../features/auth/authSlice';
import filesReducer from '../features/files/fileSlice'
import fileDetailReducer from '../features/files/fileDetailSlice'
import foldersReducer from '../features/folders/foldersSlice'
import collectionsReducer from '../features/collections/collectionSlice'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        files: filesReducer,
        fileDetail: fileDetailReducer,
        folders: foldersReducer,
        collections: collectionsReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
