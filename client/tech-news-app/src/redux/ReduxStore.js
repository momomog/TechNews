import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'

import {postsReducer} from './PostsReducer';
import {headerReducer} from './HeaderReducer';
import {commentsReducer} from "./CommentsReducer";

let reducers = combineReducers({
    postsData: postsReducer,
    commentsData: commentsReducer,
    headerData: headerReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;