import { all, put, takeEvery, call, fork } from 'redux-saga/effects'
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user'

function loginAPI() {
    // 서버에 요청을 보내는 부분
}

function* login() {
    try {
        yield call(loginAPI);       // call()은 동기호출, loginAPI가 다 실행되어야 아래가 실행된다.
        // yield fork(loginAPI);    // fork()를 사용하면, 서버에서 응답이 오기도 전에 아래가 실행된다.

        yield put({
            type: LOG_IN_SUCCESS
        });
    } catch(e) {
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE
        });
    }
}

function* watchLogin() {
    yield takeEvery(LOG_IN, login)
} 

function* watchSignUp() {
} 

export default function* userSaga() {
    yield all([
        fork(watchLogin),   // fork()는 비동기호출
        fork(watchSignUp),  // watchLogin()과 watchSignUp()은 순서가 없기 때문.
    ]) 
}