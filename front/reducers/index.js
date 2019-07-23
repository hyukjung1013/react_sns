import { combineReducers } from 'redux';
import axios from 'axios'
import user from './user';
import post from './post';

axios.defaults.baseURL = 'http://localhost:8080/api';

const rootReducer = combineReducers({
    user,
    post,
})

export default rootReducer;