import {applyMiddleware, combineReducers, createStore, Reducer, Store} from "redux";
import thunkMiddleware from 'redux-thunk'

import {postsReducer} from './PostsReducer';
import {userReducer} from './UserReducer';
import {commentsReducer} from "./CommentsReducer";
import {reducer as formReducer} from 'redux-form'
import {PostState} from "../models/PostModel";
import {CommentState} from "../models/CommentModel";
import {UserState} from "../models/UserModel";

export interface RootState {
    postsData: PostState
    commentsData: CommentState
    userData: UserState
}

const reducers: Reducer = combineReducers({
    postsData: postsReducer,
    commentsData: commentsReducer,
    userData: userReducer,
    form: formReducer
})

let store: Store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store