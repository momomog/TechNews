import {Comment, CommentAction} from '../../models/CommentModel'
import {getSectionName} from '../../common/Const'
import {Dispatch} from 'redux'
import CommentAPI from '../../api/CommentAPI'

export const SET_POST_COMMENTS = 'SET-POST-COMMENTS'
export const GET_POST_COMMENTS = 'GET-POST-COMMENTS'


export const setPostComments = (comments: Array<Comment>, commentsCount: number): CommentAction => ({
    type: SET_POST_COMMENTS,
    postComments: comments,
    commentsCount
})

// export const getPostComments = (sectionId: number, postId: number) => ({
//     type: GET_POST_COMMENTS,
//     sectionName: getSectionName(sectionId),
//     postId
// })

export const getPostComments = (sectionId: number, postId: number): any => async (dispatch: Dispatch) => {
    try {
        const response = await CommentAPI.getPostComments(getSectionName(sectionId), postId)
        dispatch(setPostComments(response.comments, response.commentsCount))
    } catch (e) {
    }
}
