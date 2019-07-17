import { take, all, put, delay } from 'redux-saga/effects'
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user'

function* watchLogin() {
    while(true) {
        yield take(LOG_IN); // LOG_IN 액션 이벤트 등록
                            // LOG_IN 액션이 발생하면 LOG_IN_SUCCESS 액션이 실행된다.
        yield delay(3000);
        
        yield put({         // put() is equal to dispatch().
            type: LOG_IN_SUCCESS
        });  
    }
} 

function* watchSignUp() {
} 

export default function* userSaga() {
    yield all([
        watchLogin(),
        watchSignUp(),
    ]) 
}