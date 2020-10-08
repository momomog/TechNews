import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {match, useRouteMatch} from 'react-router-dom'
import Comments from './Comments'
import CommentAPI from '../../../../api/CommentAPI'
import {NotificationManager} from 'react-notifications'
import {CommentRequest, CommentState} from '../../../../models/CommentModel'
import {getPostComments} from '../../../../redux/actions/commentActions'
import {commentsDataSelector, postsDataSelector} from '../../../../redux/selectors/selectors'
import {Dispatch} from 'redux'
import {PostState} from '../../../../models/PostModel'

export enum CommentActions {
    LIKE,
    DELETE,
    UPDATE,
    ADD_NEW
}


/**
 * Список комментариев. Оболочка
 */
const CommentsWrapper: React.FC = () => {
    const {params}: match<{ postId: string }> = useRouteMatch(),
        dispatch: Dispatch = useDispatch(),
        {sectionId}: PostState = useSelector(postsDataSelector),
        {commentsCount, postComments}: CommentState = useSelector(commentsDataSelector),
        postId: number = +params.postId

    useEffect(() => {
        dispatch(getPostComments(sectionId, postId))
    }, [postId, sectionId])

    const commentAction = async (
        action: CommentActions,
        actionIndefiniteForm: string,
        commentId?: number,
        updateCommentText?: string,
        request?: CommentRequest) => {
        try {
            if (action === CommentActions.ADD_NEW && commentId)
                await CommentAPI.likeComment(postId, commentId)
            else if (action === CommentActions.DELETE && commentId)
                await CommentAPI.deleteComment(postId, commentId)
            else if (action === CommentActions.UPDATE && commentId && updateCommentText)
                await CommentAPI.updateComment(postId, commentId, updateCommentText)
            else if (action === CommentActions.ADD_NEW && request)
                await CommentAPI.sendNewPostComment({
                    postId: postId,
                    commentText: request && request.commentText,
                    parentCommentId: request && request.parentCommentId,
                    parentCommentAuthorName: request && request.parentCommentAuthorName
                })

            dispatch(getPostComments(sectionId, postId))
        } catch (e) {
            NotificationManager.error('Произошла неизвестная ошибка', `Не удалось ${actionIndefiniteForm} комментарий`)
        }
    }

    return <Comments comments={postComments}
                     commentsCount={commentsCount}
                     commentAction={commentAction}/>
}

export default CommentsWrapper