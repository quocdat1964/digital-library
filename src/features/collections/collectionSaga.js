import { call, put, take, takeLatest } from 'redux-saga/effects'
import { collectionApi } from '../../api/collectionApi'
import {
    fetchCollections, fetchCollectionsFailure, fetchCollectionsSuccess,
    createCollection, createCollectionFailure, createCollectionSuccess,
    updateCollection, updateCollectionFailure, updateCollectionSuccess,
    deleteCollection, deleteCollectionFailure, deleteCollectionSuccess
} from './collectionSlice'

function* handleFetchCollections() {
    try {
        const collections = yield call(collectionApi.fetchCollections)
        yield put(fetchCollectionsSuccess(collections))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

function* handleCreateCollection(action) {
    try {
        yield call(collectionApi.createCollection, action.payload);
        yield put(createCollectionSuccess());
        yield put(fetchCollections());
    } catch (error) {
        yield put(createCollectionFailure(error.message));
    }
}

function* handleUpdateCollection(action) {
    try {
        yield call(collectionApi.updateCollection, action.payload);
        yield put(updateCollectionSuccess());
        yield put(fetchCollections());
    } catch (error) {
        yield put(updateCollectionFailure(error.message));
    }
}

function* handleDeleteCollection(action) {
    try {
        yield call(collectionApi.deleteCollection, action.payload);
        yield put(deleteCollectionSuccess());
        yield put(fetchCollections());
    } catch (error) {
        yield put(deleteCollectionFailure(error.message));
    }
}

export function* watchCollections() {
    yield takeLatest(fetchCollections.type, handleFetchCollections)
    yield takeLatest(createCollection.type, handleCreateCollection)
    yield takeLatest(updateCollection.type, handleUpdateCollection)
    yield takeLatest(deleteCollection.type, handleDeleteCollection)
}