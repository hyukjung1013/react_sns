import { take, all, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user'

const HELLO_SAGA = 'HELLO_SAGA';

// function* watchHello() {
//     while(true) {
//         yield take(HELLO_SAGA);
//         console.log('HELLO SAGA !');
//     }
// } 

// function* watchHello() {
//     yield takeEvery(HELLO_SAGA, function*() {
//         console.log('HELLO SAGA !');
//     });
// } 

function* watchHello() {
    yield takeLatest(HELLO_SAGA, function*() {  
        // 이전 요청들에 끝나지 않은게 있다면 이전 요청들을 취소한다.
        yield delay(1000);
        console.log('HELLO SAGA !');
    });
} 

function* watchLogin() {
    while(true) {
        yield take(LOG_IN); 
        yield put({ 
            type: LOG_IN_SUCCESS
        });  
    }
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