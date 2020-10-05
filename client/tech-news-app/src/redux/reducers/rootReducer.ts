import {PostState} from '../../models/PostModel'
import {CommentState} from '../../models/CommentModel'
import {UserState} from '../../models/UserModel'
import {combineReducers, Reducer} from 'redux'
import {postsReducer} from './postsReducer'
import {commentsReducer} from './commentsReducer'
import {userReducer} from './userReducer'
import {FormStateMap, reducer as formReducer} from 'redux-form'
import {messagesReducer} from './messagesReducer'
import {MessageState} from '../../models/MessageModel'

export interface RootState {
    postsData: PostState
    commentsData: CommentState
    userData: UserState
    messagesData: MessageState
}

const rootReducer: Reducer = combineReducers<RootState & {form: FormStateMap}>({
    postsData: postsReducer,
    commentsData: commentsReducer,
    userData: userReducer,
    messagesData: messagesReducer,
    form: formReducer
})

export default rootReducer
