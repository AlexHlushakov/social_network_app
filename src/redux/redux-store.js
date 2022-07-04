import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './authReducer';
import appReducer from './appReducer';
import { reducer as formReducer } from 'redux-form';
import usersReducer from "./usersReducer";
import profileReducer from "./profileReducer";


let reducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    usersPage: usersReducer,
    profilePage: profileReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;