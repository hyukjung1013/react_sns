import { take } from 'redux-saga/effects'
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user'

const HELLO_SAGA = 'HELLO_SAGA'

function* watchHello() {
    console.log('Before action');
    while(true) {
        yield take(HELLO_SAGA);
        console.log('After action');
    }
} 

export default function* userSaga() {
    yield watchHello();
}