import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './authReducer';
import appReducer from './appReducer';
import { reducer as formReducer } from 'redux-form';
import usersReducer from "./usersReducer";


let reducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    usersPage: usersReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;