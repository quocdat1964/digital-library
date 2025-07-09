import { call, put, takeLatest } from 'redux-saga/effects'
import { userApi } from '../../api/userApi'
import {
    fetchUsers, fetchUsersFailure, fetchUsersSuccess,
    createUser, createUserFailure, createUserSuccess,
    updateUserRole, updateUserRoleFailure, updateUserRoleSuccess,
    deleteUser, deleteUserFailure, deleteUserSuccess,
} from './userSlice'

function* handleFetchUsers() {
    try {
        const users = yield call(userApi.fetchUsers)
        yield put(fetchUsersSuccess(users))
    } catch (error) {
        yield put(fetchUsersFailure(error.message))
    }
}

function* handleCreateUser(action) {
    try {
        yield call(userApi.createUser, action.payload)
        yield put(createUserSuccess())
        yield put(fetchUsers()) //Bước này sau khi có api real sẽ bỏ đi
    } catch (error) {
        yield put(createUserFailure(error.message))
    }
}

function* handleUpdateUserRole(action) {
    try {
        yield call(userApi.updateUserRole, action.payload)
        yield put(updateUserRoleSuccess())
        yield put(fetchUsers())  //Bước này sau khi có api real sẽ bỏ đi
    } catch (error) {
        yield put(updateUserRoleFailure(error.message))
    }
}

function* handleDeleteUser(action) {
    try {
        yield call(userApi.deleteUser, action.payload)
        yield put(deleteUserSuccess())
        yield put(fetchUsers())  //Bước này sau khi có api real sẽ bỏ đi
    } catch (error) {
        yield put(deleteUserFailure(error.message))
    }
}

export function* watchUsers() {
    yield takeLatest(fetchUsers.type, handleFetchUsers)
    yield takeLatest(createUser.type, handleCreateUser)
    yield takeLatest(updateUserRole.type, handleUpdateUserRole)
    yield takeLatest(deleteUser.type, handleDeleteUser)
}