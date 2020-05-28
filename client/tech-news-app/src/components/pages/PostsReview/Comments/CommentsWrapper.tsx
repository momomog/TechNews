import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useRouteMatch} from 'react-router-dom'
import Comments from './Comments'
import CommentAPI from '../../../../api/CommentAPI'
import {NotificationManager} from 'react-notifications'
import {Comment, CommentRequest} from '../../../../models/CommentModel'
import {User} from '../../../../models/UserModel'
import {Dispatch} from 'redux'
import {getPostComments} from '../../../../redux/actions/commentActions'
import {RootState} from '../../../../redux/reducers/rootReducer'
import {GET_POST_COMMENTS} from '../../../../redux/actions/commentActions'

interface Props {
    sectionId: number
    postComments: Array<Comment>
    commentsCount: number
    getPostComments: (sectionId: number, postId: number) => void
}

/**
 * Список комментариев. Оболочка
 * @param sectionId
 * @param postComments
 * @param commentsCount
 * @param getPostComments
 */
const CommentsWrapper: React.FC<Props> = ({sectionId, postComments, commentsCount, getPostComments}) => {
    const {params}: any = useRouteMatch()
    const postId = params.postId

    useEffect(() => {
        getPostComments(sectionId, postId)
    }, [postId, getPostComments, sectionId])

    const likeCommentary = (commentId: number) => {
        CommentAPI.likeComment(postId, commentId)
            .then(() => getPostComments(sectionId, postId))
            .catch(() => NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось оценить комментарий'))
    }

    const deleteCommentary = (commentId: number) => {
        CommentAPI.deleteComment(postId, commentId)
            .then(() => getPostComments(sectionId, postId))
            .catch(() => NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось удалить комментарий'))
    }

    const updateCommentary = (commentId: number, commentText: string) => {
        CommentAPI.updateComment(postId, commentId, commentText)
            .then(() => getPostComments(sectionId, postId))
            .catch(() => NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось обновить комментарий'))
    }

    const addNewCommentary = (request: CommentRequest) => {
        CommentAPI.sendNewPostComment({
            postId: postId,
            commentText: request && request.commentText,
            parentCommentId: request && request.parentCommentId,
            parentCommentAuthorName: request && request.parentCommentAuthorName
        })
            .then(() => getPostComments(sectionId, postId))
            .catch(() => NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось добавить комментарий'))
    }

    return <Comments comments={postComments}
                     commentsCount={commentsCount}
                     addNewCommentary={addNewCommentary}
                     likeCommentary={likeCommentary}
                     updateCommentary={updateCommentary}
                     deleteCommentary={deleteCommentary}/>
}

const mapStateToProps = (state: RootState) => {
    return {
        sectionId: state.postsData.sectionId,
        postComments: state.commentsData.postComments,
        commentsCount: state.commentsData.commentsCount
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPostComments: (sectionId: number, postId: number) => dispatch(getPostComments(sectionId, postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsWrapper)