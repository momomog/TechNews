import {Comment, CommentAction} from '../../models/CommentModel'
import {Dispatch} from 'redux'
import CommentAPI from '../../api/CommentAPI'
import {getSectionName} from '../../common/Const'

export const SET_POST_COMMENTS = 'SET-POST-COMMENTS'


const setPostComments = (comments: Array<Comment>, commentsCount: number): CommentAction => ({
    type: SET_POST_COMMENTS,
    postComments: comments,
    commentsCount
})

export const getPostComments = (sectionId: number, postId: number): any => (dispatch: Dispatch) => {
    CommentAPI.getPostComments(getSectionName(sectionId), postId)
        .then(data => dispatch(setPostComments(data.comments, data.commentsCount)))
}
