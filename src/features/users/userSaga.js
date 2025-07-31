import { call, put, takeLatest } from 'redux-saga/effects'
import userService from '../../services/userService'
import {
    fetchUsers, fetchUsersFailure, fetchUsersSuccess,
    createUser, createUserFailure, createUserSuccess,
    updateUserRole, updateUserRoleFailure, updateUserRoleSuccess,
    deleteUser, deleteUserFailure, deleteUserSuccess,
} from './userSlice'

function* handleFetchUsers() {
    try {
        const users = yield call(userService.getAllUsers)
        yield put(fetchUsersSuccess(users))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi lấy danh sách người dùng.";
        yield put(fetchUsersFailure(errorMessage));
    }
}

function* handleCreateUser(action) {
    try {
        const newUser = yield call(userService.createUser, action.payload)
        yield put(createUserSuccess(newUser))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi tạo người dùng.";
        yield put(createUserFailure(errorMessage));
    }
}

function* handleUpdateUserRole(action) {
    try {
        const { userId, newRole } = action.payload
        const updatedUser = yield call(userService.updateUserRole, userId, newRole)
        yield put(updateUserRoleSuccess(updatedUser))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật vai trò người dùng.";
        yield put(updateUserRoleFailure(errorMessage));
    }
}

function* handleDeleteUser(action) {
    try {
        const userId = action.payload
        yield call(userService.deleteUser, userId)
        yield put(deleteUserSuccess(userId))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi xóa người dùng.";
        yield put(deleteUserFailure(errorMessage));
    }
}

export function* watchUsers() {
    yield takeLatest(fetchUsers.type, handleFetchUsers)
    yield takeLatest(createUser.type, handleCreateUser)
    yield takeLatest(updateUserRole.type, handleUpdateUserRole)
    yield takeLatest(deleteUser.type, handleDeleteUser)
}