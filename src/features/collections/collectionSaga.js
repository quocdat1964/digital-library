import { call, put, take, takeLatest } from 'redux-saga/effects'
import collectionService from '../../services/collectionService'
import {
    fetchCollections, fetchCollectionsFailure, fetchCollectionsSuccess,
    createCollection, createCollectionFailure, createCollectionSuccess,
    updateCollection, updateCollectionFailure, updateCollectionSuccess,
    deleteCollection, deleteCollectionFailure, deleteCollectionSuccess,
    fetchCollectionDetails, fetchCollectionDetailsFailure, fetchCollectionDetailsSuccess
} from './collectionSlice'
import toast from 'react-hot-toast'

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
        toast.success("Tạo bộ sưu tập thành công")
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi tạo collection mới.";
        yield put(createCollectionFailure(errorMessage));
        toast.error("Lỗi khi tạo bộ sưu tập")
    }
}

function* handleUpdateCollection(action) {
    try {
        const collectionData = action.payload
        const updatedCollection = yield call(collectionService.updateCollection, collectionData.collectionId, collectionData.name)
        yield put(updateCollectionSuccess(updatedCollection))
        toast.success("Cập nhật bộ sưu tập thành công")
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật collection.";
        yield put(updateCollectionFailure(errorMessage));
        toast.error("Lỗi khi cập nhật bộ sưu tập")
    }
}

function* handleDeleteCollection(action) {
    try {
        const collectionId = action.payload
        yield call(collectionService.deleteCollection, collectionId)
        yield put(deleteCollectionSuccess(collectionId))
        toast.success("Xóa bộ sưu tập thành công")
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi xóa collection.";
        yield put(deleteCollectionFailure(errorMessage));
        toast.error("Lỗi khi xóa bộ sưu tập")
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