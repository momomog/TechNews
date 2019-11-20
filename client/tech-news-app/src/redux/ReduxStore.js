import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'

import {postsReducer} from './PostsReducer';
import {authReducer} from './AuthReducer';
import {commentsReducer} from "./CommentsReducer";

let reducers = combineReducers({
    postsData: postsReducer,
    commentsData: commentsReducer,
    authData: authReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;