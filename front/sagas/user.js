import { take } from 'redux-saga/effects'
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user'

const HELLO_SAGA = 'HELLO_SAGA'

function* watchHello() {
    console.log('Before action');
    yield take(HELLO_SAGA);
    // dispatch 리스너
    // 'HELLO_SAGA'라는 action이 dispatch되면 내부적으로 next()를 호출하여 중단점을 푼다.
    console.log('After action');
} 

export default function* userSaga() {
    yield watchHello();
}