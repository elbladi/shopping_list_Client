import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: '',
    token: null,
    error: false,
    loading: false,
};

const loginStart = (state, action) => {
    return updateObject(state, {
        error: false,
        loading: true,
    });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        token: action.token,
        loading: false,
        error: false,
    });
};

const loginFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true
    });
};

const logout = (state, action) => {
    return updateObject(state, {
        userId: null,
        token: null
    });
};

const logged = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        token: action.token
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START: return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        case actionTypes.AUTO_LOGIN: return logged(state, action);
        default: return state;
    };
};

export default reducer;