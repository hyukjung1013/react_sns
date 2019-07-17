const dummyUser = {
    nickname: 'ronaldo',
    Post: [],
    Followings: [],
    Followers: [],
    signUpData: {},
}

export const initalState = {
    isLoggedIn: false,
    user: null,
}

export const LOG_IN = 'LOG_IN'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'
export const LOG_OUT = 'LOG_OUT'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'

export const loginAction = {
    type: LOG_IN,
};

export const logoutAction = {
    type: LOG_OUT,
}

export const signUpAction = (data) => {
    return {
        type: SIGN_UP,
        data: data,
    };
}

export const signUpSuccess = {
    type: SIGN_UP_SUCCESS
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
        case SIGN_UP: {
            return {
                ...state, 
                signUpData: action.data,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }  
};

export default reducer;