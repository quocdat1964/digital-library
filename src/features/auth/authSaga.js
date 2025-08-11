import { call, put, takeLatest } from "redux-saga/effects";
import authService from "../../services/authService";
import { loginStart, loginSuccess, loginFailure, logout, setAuthFromLocalStorage } from "./authSlice";

function* handleLogin(action) {
    try {
        const { email, password } = action.payload
        const responseData = yield call(authService.login, email, password)
        yield put(loginSuccess(responseData))
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Đăng nhập thất bại.";
        yield put(loginFailure(errorMessage));
    }
}

function* handleLogout() {
    try {
        yield call(authService.logout)
    } catch (error) {
        console.error("Lỗi khi đăng xuất API, nhưng đã xóa token phía client:", error);
    }
}

function* checkAuthOnAppLoad() {
    try {
        const token = localStorage.getItem('jwtToken');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
            const user = JSON.parse(userStr);
            yield put(setAuthFromLocalStorage({ token, user }));
        }
    } catch (error) {
        console.error("Lỗi khi kiểm tra xác thực từ localStorage:", error);
        yield put(logout());
    }
}


export function* watchLogin() {
    yield call(checkAuthOnAppLoad)
    yield takeLatest(loginStart.type, handleLogin)
    yield takeLatest(logout.type, handleLogout)
}