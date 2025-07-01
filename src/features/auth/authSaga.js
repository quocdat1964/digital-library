import { call, put, takeLatest } from "redux-saga/effects";
import { authApi } from "../../api/authApi";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";

function* handleLogin(action){
    try {
        const credentials = action.payload
        const user = yield call(authApi.login, credentials)
        localStorage.setItem('authToken', user.token)
        yield put(loginSuccess(user))
    } catch (error) {
        yield put(loginFailure(error.message))
    }
}

export function* watchLogin(){
    yield takeLatest(loginStart.type, handleLogin)
}