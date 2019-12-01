import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'

import {postsReducer} from './PostsReducer';
import {authReducer} from './AuthReducer';
import {commentsReducer} from "./CommentsReducer";
import {profileReducer} from "./ProfileReducer";

let reducers = combineReducers({
    postsData: postsReducer,
    commentsData: commentsReducer,
    authData: authReducer,
    profileData: profileReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;