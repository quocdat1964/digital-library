import { call, put, takeLatest } from "redux-saga/effects";
import { authApi } from "../../api/authApi";
import { loginStart, loginSuccess, loginFailure, logout, validateToken } from "./authSlice";

function* handleLogin(action) {
    try {
        const credentials = action.payload
        const { user, token } = yield call(authApi.login, credentials)
        localStorage.setItem('authToken', user.token)
        yield put(loginSuccess({ user, token }))
    } catch (error) {
        yield put(loginFailure(error.message))
    }
}

function* handleLogout() {
    try {
        yield call(authApi.logout)
    } catch (error) {
        console.error("Logout API call failed, but proceeding with client-side logout.", error);
    }
}

function* handleValidateToken(action) {
    try {
        const token = action.payload
        const { user } = yield call(authApi.validateToken, token)
        yield put(loginSuccess({ user, token }))
    } catch (error) {
        console.error("Token validation failed:", error.message);
        yield put(logout());
    }
}

export function* watchLogin() {
    yield takeLatest(loginStart.type, handleLogin)
    yield takeLatest(logout.type, handleLogout)
    yield takeLatest(validateToken.type, handleValidateToken)
}