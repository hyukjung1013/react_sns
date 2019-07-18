import { all, put, takeEvery, call, fork, delay } from 'redux-saga/effects'
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducers/user'
import axios from 'axios';

// LOG IN
function loginAPI() {
    return axios.post('/login');
}

function* login() {
    try {
        yield delay(2000);
        // yield call(loginAPI); 
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
    yield takeEvery(LOG_IN_REQUEST, login)
} 


// SIGN UP
function signUpAPI() {
    return axios.post('/signup');
}

function* signUp() {
    try {
        yield call(signUpAPI); 
        yield put({
            type: SIGN_UP_SUCCESS
        });
    } catch(e) {
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE
        });
    }
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp)
} 

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
    ]) 
}