import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'

import {postsReducer} from './PostsReducer';

let reducers = combineReducers({
    postsData: postsReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store= store.getState();

export default store;