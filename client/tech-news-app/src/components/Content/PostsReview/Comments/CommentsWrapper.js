import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Comments from "./Comments";
import {changeCommentTextAction, getPostComments} from "../../../../redux/CommentsReducer";
import CommentAPI from "../../../../api/CommentAPI";
import {NotificationManager} from "react-notifications";

class CommentsWrapper extends React.Component {

    componentDidMount() {
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    }

    changeCommentText = (text) => {
        this.props.changeCommentText(text);
    };

    likeCommentary = (commentId) => {
        if (this.props.currentUserData && this.props.currentUserData.id) {
            CommentAPI.likeComment(this.props.match.params.postId, commentId, this.props.currentUserData.id)
                .catch(function (error) {
                    NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось оценить комментарий');
                });
        }

        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    };

    deleteCommentary = (commentId) => {
        if (this.props.currentUserData && this.props.currentUserData.id) {
            CommentAPI.deleteComment(this.props.match.params.postId, commentId)
                .catch(function (error) {
                    NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось удалить комментарий');
                });
        }

        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    };

    updateCommentary = (commentId, commentText) => {
        if (this.props.currentUserData && this.props.currentUserData.id) {
            CommentAPI.updateComment(this.props.match.params.postId, commentId, commentText)
                .catch(function (error) {
                    NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось обновить комментарий');
                });
        }

        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    };

    addNewCommentary = (request) => {
        CommentAPI.sendNewPostComment({
            postId: this.props.match.params.postId,
            commentText: request ? request.commentText : this.props.commentText,
            parentCommentId: request ? request.parentCommentId : null,
            parentCommentAuthorName: request ? request.parentCommentAuthorName : null
        }).catch(function (error) {
            NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось добавить комментарий');
        });

        this.props.changeCommentText('');
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    };

    render() {
        return <Comments comments={this.props.postComments}
                         commentText={this.props.commentText}
                         commentsCount={this.props.commentsCount}
                         isAuth={this.props.isAuth}
                         currentUserData={this.props.currentUserData}
                         changeCommentText={this.changeCommentText}
                         addNewCommentary={this.addNewCommentary}
                         likeCommentary={this.likeCommentary}
                         updateCommentary={this.updateCommentary}
                         deleteCommentary={this.deleteCommentary}/>
    }

}

let mapStateToProps = (state) => {
    return {
        commentText: state.commentsData.commentText,
        sectionId: state.postsData.sectionId,
        postComments: state.commentsData.postComments,
        commentsCount: state.commentsData.commentsCount,
        isAuth: state.userData.isAuth,
        currentUserData: state.userData.currentUserData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        changeCommentText: (text) => dispatch(changeCommentTextAction(text)),
        getPostComments: (sectionId, postId) => dispatch(getPostComments(sectionId, postId))
    }
};

let withUrlDataComponent = withRouter(CommentsWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(withUrlDataComponent);