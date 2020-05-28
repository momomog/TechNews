import {CommentAction, CommentState} from '../../models/CommentModel'
import {SET_POST_COMMENTS} from '../actions/commentActions'


const initialState: CommentState = {
    postComments: [],
    commentsCount: 0
}

export const commentsReducer = (state: CommentState = initialState, action: CommentAction): CommentState => {
    switch (action.type) {
        case SET_POST_COMMENTS: {
            // debugger
            if (!action.postComments)
                return state
            return {
                ...state,
                postComments: action.postComments,
                commentsCount: action.commentsCount
            }
        }
        default:
            return state
    }
}