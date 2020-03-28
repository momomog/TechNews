import CommentAPI from "../api/CommentAPI";
import {Comment, CommentAction, CommentState} from '../models/CommentModel'
import {Dispatch} from "redux";


const SET_POST_COMMENTS = 'SET-POST-COMMENTS';

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

export const setPostCommentsAction = (comments: Array<Comment>, commentsCount: number): CommentAction => ({
    type: SET_POST_COMMENTS,
    postComments: comments,
    commentsCount
})

export const getPostComments = (sectionId: number, postId: number): any => {
    return (dispatch: Dispatch) => {
        CommentAPI.getPostComments(sectionId, postId)
            .then(data => dispatch(setPostCommentsAction(data.comments, data.commentsCount)))
    }
}
