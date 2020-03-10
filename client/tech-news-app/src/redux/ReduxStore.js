import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'

import {postsReducer} from './PostsReducer';
import {userReducer} from './UserReducer';
import {commentsReducer} from "./CommentsReducer";
import {reducer as formReducer} from 'redux-form'

let reducers = combineReducers({
    postsData: postsReducer,
    commentsData: commentsReducer,
    userData: userReducer,
    form: formReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;