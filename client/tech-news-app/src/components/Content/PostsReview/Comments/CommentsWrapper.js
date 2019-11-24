import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Comments from "./Comments";
import {
    changeCommentTextAction,
    getPostComments,
    likeComment,
    sendNewPostComment
} from "../../../../redux/CommentsReducer";

class CommentsWrapper extends React.Component {

    componentDidMount() {
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    }

    changeCommentText = (text) => {
        this.props.changeCommentText(text);
    };

    likeCommentary = (commentId) => {
        this.props.likeComment(this.props.match.params.postId, commentId, this.props.userData.id);
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    };

    addNewCommentary = () => {
        this.props.addNewComment(
            this.props.match.params.postId,
            this.props.commentText,
            this.props.userData.username,
            this.props.userData.id
        );
        this.props.changeCommentText('');
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    };

    render() {
        return <Comments comments={this.props.postComments}
                         commentText={this.props.commentText}
                         isAuth={this.props.isAuth}
                         changeCommentText={this.changeCommentText}
                         addNewCommentary={this.addNewCommentary}
                         likeCommentary={this.likeCommentary}/>
    }

}

let mapStateToProps = (state) => {
    return {
        commentText: state.commentsData.commentText,
        sectionId: state.authData.sectionId,
        postComments: state.commentsData.postComments,
        isAuth: state.authData.isAuth,
        userData: state.authData.userData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        changeCommentText: (text) => dispatch(changeCommentTextAction(text)),
        getPostComments: (sectionId, postId) => dispatch(getPostComments(sectionId, postId)),
        addNewComment: (postId, commentText, authorName, authorId) => dispatch(sendNewPostComment(postId, commentText, authorName, authorId)),
        likeComment: (postId, commentId, userId) => dispatch(likeComment(postId, commentId, userId))
    }
};

let withUrlDataComponent = withRouter(CommentsWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(withUrlDataComponent);