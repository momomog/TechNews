import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useRouteMatch} from 'react-router-dom'
import Comments from './Comments'
import CommentAPI from '../../../../api/CommentAPI'
import {NotificationManager} from 'react-notifications'
import {CommentRequest} from '../../../../models/CommentModel'
import {getPostComments} from '../../../../redux/actions/commentActions'
import {commentsDataSelector, postsDataSelector} from "../../../../redux/selectors/selectors";


/**
 * Список комментариев. Оболочка
 */
const CommentsWrapper: React.FC = () => {
    const {params}: any = useRouteMatch(),
        dispatch = useDispatch(),
        {sectionId} = useSelector(postsDataSelector),
        {commentsCount, postComments} = useSelector(commentsDataSelector),
        postId = params.postId

    useEffect(() => {
        dispatch(getPostComments(sectionId, postId))
    }, [postId, sectionId])

    const commentAction = async (
        action: string,
        actionIndefiniteForm: string,
        commentId?: number,
        updateCommentText?: string,
        request?: CommentRequest) => {
        try {
            if (action === 'LIKE' && commentId)
                await CommentAPI.likeComment(postId, commentId)
            else if (action === 'DELETE' && commentId)
                await CommentAPI.deleteComment(postId, commentId)
            else if (action === 'UPDATE' && commentId && updateCommentText)
                await CommentAPI.updateComment(postId, commentId, updateCommentText)
            else if (action === 'ADD_NEW' && request)
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