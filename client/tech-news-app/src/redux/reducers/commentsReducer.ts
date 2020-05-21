import {CommentAction, CommentState} from '../../models/CommentModel'
import {SET_POST_COMMENTS} from '../actions/commentActions'


const initialState: CommentState = {
    commentsCount: 0,
    postComments: []
}

export const commentsReducer = (state: CommentState = initialState, action: CommentAction): CommentState => {
    switch (action.type) {
        case SET_POST_COMMENTS: {
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