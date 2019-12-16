import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Comments from "./Comments";
import {
    changeCommentTextAction, deleteComment,
    getPostComments,
    likeComment,
    sendNewPostComment, updateComment
} from "../../../../redux/CommentsReducer";

class CommentsWrapper extends React.Component {

    componentDidMount() {
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    }

    changeCommentText = (text) => {
        this.props.changeCommentText(text);
    };

    likeCommentary = (commentId) => {
        if (this.props.currentUserData && this.props.currentUserData.id)
            this.props.likeComment(this.props.match.params.postId, commentId, this.props.currentUserData.id);
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    };

    deleteCommentary = (commentId) => {
        if (this.props.currentUserData && this.props.currentUserData.id)
            this.props.deleteComment(this.props.match.params.postId, commentId);
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    };

    updateCommentary = (commentId, commentText) => {
        if (this.props.currentUserData && this.props.currentUserData.id)
            this.props.updateComment(this.props.match.params.postId, commentId, commentText);
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    };

    addNewCommentary = (request) => {
        debugger;
        this.props.addNewComment({
            postId: this.props.match.params.postId,
            authorId: this.props.currentUserData.id,
            authorName: this.props.currentUserData.username,
            commentText: request ? request.commentText : this.props.commentText,
            parentCommentId: request ? request.parentCommentId : null,
            parentCommentAuthorName: request ? request.parentCommentAuthorName : null
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
        sectionId: state.authData.sectionId,
        postComments: state.commentsData.postComments,
        commentsCount: state.commentsData.commentsCount,
        isAuth: state.authData.isAuth,
        currentUserData: state.profileData.currentUserData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        changeCommentText: (text) => dispatch(changeCommentTextAction(text)),
        getPostComments: (sectionId, postId) => dispatch(getPostComments(sectionId, postId)),
        addNewComment: (commentRequest) => dispatch(sendNewPostComment(commentRequest)),
        likeComment: (postId, commentId, userId) => dispatch(likeComment(postId, commentId, userId)),
        deleteComment: (postId, commentId) => dispatch(deleteComment(postId, commentId)),
        updateComment: (postId, commentId, commentText) => dispatch(updateComment(postId, commentId, commentText))
    }
};

let withUrlDataComponent = withRouter(CommentsWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(withUrlDataComponent);