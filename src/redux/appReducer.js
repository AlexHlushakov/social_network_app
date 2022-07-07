import { getAuthUserData } from "./authReducer";
import {stopSubmit} from "redux-form";
import {FeedbackAPI} from "../api/api";

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {

    switch (action.type) {

        case INITIALIZED_SUCCESS: {
            return { ...state, initialized: true };
        }

        default:
            return state;
    }
}

export const initializedSuccess = () => {
    return { type: INITIALIZED_SUCCESS };
}

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}

export const feedback = (form) => async (dispatch) => {
    let token = '2134830518:AAFjaU33bd9aVQfegOOKwCYjDijXTaL2nwc';
    let chat_id = '-669512506';
    let data = `Email: ${form.email} %0AFeedBack-Message: ${form.feedbackBody}`
    let response = await FeedbackAPI.sendFeedback(token, chat_id, data)

    if(response.status === 200) {
        dispatch(stopSubmit("feedback", { _error : "successfully sent"}))
    } else{
        dispatch(stopSubmit("feedback", { _error : "some error"}))
    }
}


export default appReducer;