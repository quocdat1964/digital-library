import { call, put, takeLatest } from 'redux-saga/effects'
import userService from '../../services/userService'
import {
    fetchUsers, fetchUsersFailure, fetchUsersSuccess,
    createUser, createUserFailure, createUserSuccess,
    updateUserRole, updateUserRoleFailure, updateUserRoleSuccess,
    deleteUser, deleteUserFailure, deleteUserSuccess,
} from './userSlice'
import toast from 'react-hot-toast'

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
        toast.success("Tạo user mới thành công")
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi tạo người dùng.";
        yield put(createUserFailure(errorMessage));
        toast.error("Lỗi khi tạo user")
    }
}

function* handleUpdateUserRole(action) {
    try {
        const { userId, newRole } = action.payload
        const updatedUser = yield call(userService.updateUserRole, userId, newRole)
        yield put(updateUserRoleSuccess(updatedUser))
        toast.success("Cập nhật vai trò của user thành công")
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật vai trò người dùng.";
        yield put(updateUserRoleFailure(errorMessage));
        toast.error("Lỗi khi cập nhật vai trò của user")
    }
}

function* handleDeleteUser(action) {
    try {
        const userId = action.payload
        yield call(userService.deleteUser, userId)
        yield put(deleteUserSuccess(userId))
        toast.success("Xóa user thành công")
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi xóa người dùng.";
        yield put(deleteUserFailure(errorMessage));
        toast.error("Lỗi khi xóa user")
    }
}

export function* watchUsers() {
    yield takeLatest(fetchUsers.type, handleFetchUsers)
    yield takeLatest(createUser.type, handleCreateUser)
    yield takeLatest(updateUserRole.type, handleUpdateUserRole)
    yield takeLatest(deleteUser.type, handleDeleteUser)
}