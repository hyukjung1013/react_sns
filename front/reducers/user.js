export const initalState = {
    isLoggedIn: false,
    user: {},
}

// Name of actions.
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export const loginAction = {
    type: LOG_IN,
    data: {
        nickname: 'zerocho'
    }
};

export const logoutAction = {
    type: LOG_OUT,
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
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