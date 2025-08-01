import { call, put, take, takeLatest } from 'redux-saga/effects'
import collectionService from '../../services/collectionService'
import {
    fetchCollections, fetchCollectionsFailure, fetchCollectionsSuccess,
    createCollection, createCollectionFailure, createCollectionSuccess,
    updateCollection, updateCollectionFailure, updateCollectionSuccess,
    deleteCollection, deleteCollectionFailure, deleteCollectionSuccess,
    fetchCollectionDetails, fetchCollectionDetailsFailure, fetchCollectionDetailsSuccess
} from './collectionSlice'

function* handleFetchCollections() {
    try {
        const collections = yield call(collectionService.getAllCollections)
        yield put(fetchCollectionsSuccess(collections))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi lấy danh sách collections.";
        yield put(fetchCollectionsFailure(errorMessage));
    }
}

function* handleCreateCollection(action) {
    try {
        const newCollection = yield call(collectionService.createCollection, action.payload)
        yield put(createCollectionSuccess(newCollection))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi tạo collection mới.";
        yield put(createCollectionFailure(errorMessage));
    }
}

function* handleUpdateCollection(action) {
    try {
        const collectionData = action.payload
        console.log("Check Saga: ", collectionData.collectionId, collectionData.name)
        const updatedCollection = yield call(collectionService.updateCollection, collectionData.collectionId, collectionData.name)
        yield put(updateCollectionSuccess(updatedCollection))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật collection.";
        yield put(updateCollectionFailure(errorMessage));
    }
}

function* handleDeleteCollection(action) {
    try {
        const collectionId = action.payload
        yield call(collectionService.deleteCollection, collectionId)
        yield put(deleteCollectionSuccess(collectionId))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi xóa collection.";
        yield put(deleteCollectionFailure(errorMessage));
    }
}

function* handleFetchCollectionDetails(action) {
    try {
        const collectionId = action.payload
        const collectionDetails = yield call(collectionService.getCollectionById, collectionId)
        yield put(fetchCollectionDetailsSuccess(collectionDetails))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi lấy chi tiết collection.";
        yield put(fetchCollectionDetailsFailure(errorMessage));
    }
}

export function* watchCollections() {
    yield takeLatest(fetchCollections.type, handleFetchCollections)
    yield takeLatest(createCollection.type, handleCreateCollection)
    yield takeLatest(updateCollection.type, handleUpdateCollection)
    yield takeLatest(deleteCollection.type, handleDeleteCollection)
    yield takeLatest(fetchCollectionDetails.type, handleFetchCollectionDetails)
}