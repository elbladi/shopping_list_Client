import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const loginSuccess = (token, userId) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
        userId: userId
    };
};

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginFail = () => {
    return {
        type: actionTypes.LOGIN_FAIL
    };
};

export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.LOGOUT
    }
}

export const checkLoginTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn);
    }
}

export const autoLogin = () => {
    return dispatch => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            dispatch(logged(userId, token));
        }
    }
}

export const logged = (id, token) => {
    return {
        type: actionTypes.AUTO_LOGIN,
        userId: id,
        token: token
    };
}

export const login = (id) => {

    return dispatch => {
        dispatch(loginStart());

        try {
            axios.post(process.env.REACT_APP_API + '/api/login', {
                id: id
            }).then(resp => {
                if (resp.data.userId) {
                    localStorage.setItem('token', resp.data.token);
                    localStorage.setItem('userId', resp.data.userId);
                    dispatch(loginSuccess(resp.data.token, resp.data.userId));
                }
            }).catch(err => {
                dispatch(loginFail());
            });
        } catch (error) {
            dispatch(loginFail());
        }
    };
};