import {combineReducers, createStore, Reducer, Store} from 'redux'
import {reducer as formReducer} from 'redux-form'

import {postsReducer} from './reducers/postsReducer'
import {userReducer} from './reducers/userReducer'
import {commentsReducer} from './reducers/commentsReducer'
import {PostState} from '../models/PostModel'
import {CommentState} from '../models/CommentModel'
import {UserState} from '../models/UserModel'
import composeEnhancers from './middleware'

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


let store: Store = createStore(reducers, composeEnhancers)

export default store