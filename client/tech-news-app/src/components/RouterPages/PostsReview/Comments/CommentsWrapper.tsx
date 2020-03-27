import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Comments from "./Comments";
import {getPostComments} from "../../../../redux/CommentsReducer";
import CommentAPI from "../../../../api/CommentAPI";
import {NotificationManager} from "react-notifications";
import {Comment} from "../../../../models/CommentModel";
import {User} from "../../../../models/UserModel";
import {RouteComponentProps} from "react-router";
import {RootState} from "../../../../redux/ReduxStore";
import {Dispatch} from "redux";
import Spinner from "../../../core/Spinner";

export interface CommentRequest {
    postId?: number
    commentText: string
    parentCommentId?: number
    parentCommentAuthorName?: string
}

interface Props {
    sectionId: number
    postComments: Array<Comment>
    commentsCount: number
    isAuth: boolean
    currentUserData: User
    getPostComments: (sectionId: number, postId: number) => void
}

/**
 * компонент Оболочка комментариев
 */
class CommentsWrapper extends React.Component<RouteComponentProps<any> & Props> {

    componentDidMount() {
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId)
    }

    likeCommentary = (commentId: number) => {
        CommentAPI.likeComment(this.props.match.params.postId, commentId)
            .catch(function (error) {
                NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось оценить комментарий')
            })

        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId)
    }

    deleteCommentary = (commentId: number) => {
        CommentAPI.deleteComment(this.props.match.params.postId, commentId)
            .catch(function (error) {
                NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось удалить комментарий')
            })

        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    }

    updateCommentary = (commentId: number, commentText: string) => {
        CommentAPI.updateComment(this.props.match.params.postId, commentId, commentText)
            .catch(function (error) {
                NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось обновить комментарий');
            })

        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    }

    addNewCommentary = (request: CommentRequest) => {
        CommentAPI.sendNewPostComment({
            postId: this.props.match.params.postId,
            commentText: request && request.commentText,
            parentCommentId: request && request.parentCommentId,
            parentCommentAuthorName: request && request.parentCommentAuthorName
        }).catch(function (error) {
            NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось добавить комментарий');
        })

        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId)
    }

    render() {
        return this.props.postComments
            ? <Comments comments={this.props.postComments}
                        commentsCount={this.props.commentsCount}
                        isAuth={this.props.isAuth}
                        currentUserData={this.props.currentUserData}
                        addNewCommentary={this.addNewCommentary}
                        likeCommentary={this.likeCommentary}
                        updateCommentary={this.updateCommentary}
                        deleteCommentary={this.deleteCommentary}/>
            : <Spinner/>
    }

}

let mapStateToProps = (state: RootState) => {
    return {
        sectionId: state.postsData.sectionId,
        postComments: state.commentsData.postComments,
        commentsCount: state.commentsData.commentsCount,
        isAuth: state.userData.isAuth,
        currentUserData: state.userData.currentUserData
    }
};

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPostComments: (sectionId: number, postId: number) => dispatch(getPostComments(sectionId, postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsWrapper))