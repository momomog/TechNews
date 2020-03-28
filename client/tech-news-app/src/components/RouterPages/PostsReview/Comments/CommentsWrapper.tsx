import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Comments from "./Comments";
import {getPostComments} from "../../../../redux/CommentsReducer";
import CommentAPI from "../../../../api/CommentAPI";
import {NotificationManager} from "react-notifications";
import {Comment, CommentRequest} from "../../../../models/CommentModel";
import {User} from "../../../../models/UserModel";
import {RouteComponentProps} from "react-router";
import {RootState} from "../../../../redux/ReduxStore";
import {Dispatch} from "redux";

interface Props {
    sectionId: number
    postComments: Array<Comment>
    commentsCount: number
    isAuth: boolean
    currentUserData: User
    getPostComments: (sectionId: number, postId: number) => void
}

/**
 *
 * @param sectionId
 * @param postComments
 * @param commentsCount
 * @param isAuth
 * @param currentUserData
 * @param getPostComments
 * @param match
 * Список комментариев. Оболочка
 */
const CommentsWrapper: React.FC<RouteComponentProps<any> & Props> = ({sectionId, postComments, commentsCount, isAuth, currentUserData, getPostComments, match}) => {
    const postId = match.params.postId;

    useEffect(() => {
        getPostComments(sectionId, postId)
    }, [])

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
                     isAuth={isAuth}
                     currentUserData={currentUserData}
                     addNewCommentary={addNewCommentary}
                     likeCommentary={likeCommentary}
                     updateCommentary={updateCommentary}
                     deleteCommentary={deleteCommentary}/>
}

let mapStateToProps = (state: RootState) => {
    return {
        sectionId: state.postsData.sectionId,
        postComments: state.commentsData.postComments,
        commentsCount: state.commentsData.commentsCount,
        isAuth: state.userData.isAuth,
        currentUserData: state.userData.currentUserData
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPostComments: (sectionId: number, postId: number) => dispatch(getPostComments(sectionId, postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsWrapper))