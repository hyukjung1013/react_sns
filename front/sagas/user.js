import { take, all } from 'redux-saga/effects'
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user'

const HELLO_SAGA = 'HELLO_SAGA'

function* watchHello() {
    console.log('Before action');
    for (let i=0; i<3; i++) {
        yield take(HELLO_SAGA);
        console.log('After action');
    }
} 

function* watchLogin() {
} 

function* watchSignUp() {
} 

export default function* userSaga() {
    yield all([
        watchHello(),
        watchLogin(),
        watchSignUp(),
    ]) 
}