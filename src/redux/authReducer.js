import {AuthAPI} from "../api/api";
import { stopSubmit } from "redux-form";


const SET_AUTH_USER = 'SET_AUTH_USER';
    // TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    authUserId: null,
    login: null,
    email: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_AUTH_USER: {
            return { ...state, authUserId: action.authData.authUserId,login:action.authData.login, email: action.authData.email, isAuth: action.authData.isAuth};
        }

        default:
            return state;
    }
}

export const setAuthUser = (authUserId, email, login, isAuth) => {
    return { type: SET_AUTH_USER, authData: { authUserId, email, login, isAuth } };
}

// export const toggleIsFetching = (isFetching) => {
//     return { type: TOGGLE_IS_FETCHING, isFetching: isFetching };

export const loginUser = (email, password, rememberMe) => async (dispatch) => {
    let response = await AuthAPI.authLogin(email, password, rememberMe)

    if (response.resultCode === 0) {
        let promise = await dispatch(getAuthUserData());
        if(promise){ return true}
    } else {
        let message = response.messages.length > 0 ? response.messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: message }));
    }
}

export const logout = () => async (dispatch) => {
    let response = await AuthAPI.authLogout();

    if (response.resultCode === 0) {
        dispatch(setAuthUser(null, null, null, false))
    }
}

export const getAuthUserData = () => async (dispatch) => {
    let response = await AuthAPI.authMe();

    if (response.resultCode === 0) {
        dispatch(setAuthUser(response.data.id, response.data.email, response.data.login, true));
        return true
    }
}

export default authReducer;