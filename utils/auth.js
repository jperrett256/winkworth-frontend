import { connect } from 'react-redux';
import postJSON from './postJson';

// Redux reducer for auth state
export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'AUTH_LOGIN':
            return {
                authenticated: true,
                data: action.data
            };
        case 'AUTH_LOGOUT':
            return {
                authenticated: false,
                data: null
            };
        default:
            return state
    }
};

// Acquires user data (stored in cookie)
function getData() {
    try {
        const match = document.cookie.match(/(^| )token_data=([^;]+)/);

        if (match) {
            const payload = atob(match[2].split('.')[1]);
            return JSON.parse(payload);
        } else {
            return null;
        }
    } catch (e) {
        // document is not defined on server side
        if (e.name !== 'ReferenceError') throw e;
    };
}

// Removes user data
function clearData() {
    document.cookie = 'token_data=';
}

// Initialize auth state
export const initAuth = dispatch => {
    let data;
    if (data = getData()) {
        dispatch(loginAction(data));
    } else {
        dispatch(logoutAction());
    }
};

// Returns an object with user data or (if unsuccessful) an error message
async function processResponse(response) {
    let data;
    if (response.ok && (data = getData())) {
        return {
            success: true,
            data
        };
    } else {
        clearData();

        return {
            success: false,
            data: response.status == 400 ? await response.text() : 'An error occurred, please try again later.'
        };
    }
}

// TODO rename actions to auth and deauth?

// Redux action emitters
const loginAction = data => ({
    type: 'AUTH_LOGIN',
    data
});

const logoutAction = () => ({
    type: 'AUTH_LOGOUT'
});

// Define auth functions for components to use
const useAuthDispatch = dispatch => {
    return {
        login: async function (user) {
            const response = await postJSON('/api/users/signin', user);

            const result = await processResponse(response);
            dispatch(result.success ? loginAction(result.data) : logoutAction());
            return result;
        },
        logout: function () {
            clearData();
            dispatch(logoutAction());
        },
        signup: async function (user) {
            const response = await postJSON('/api/users/signup', user);

            const result = await processResponse(response);
            dispatch(result.success ? loginAction(result.data) : logoutAction());
            return result;
        }
    };
};

// Allows components to call auth functions
export const useAuth = Component => {
    return connect(
        null,
        useAuthDispatch
    )(Component);
};

// Define how components should read auth state
const withAuthProps = state => {
    return {
        auth: Object.assign({}, state)
    };
};

// Allows components to read auth state
export const withAuth = Component => {
    return connect(
        withAuthProps
    )(Component);
};
