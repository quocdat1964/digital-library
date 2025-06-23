import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

import uiReducer from '../features/ui/uiSlice'
import { authReducer } from '../features/auth/authSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
