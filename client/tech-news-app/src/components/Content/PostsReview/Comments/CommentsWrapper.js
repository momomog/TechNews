import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Comments from "./Comments";
import {changeCommentTextAction, getPostComments, sendNewPostComment} from "../../../../redux/CommentsReducer";

class CommentsWrapper extends React.Component {

    componentDidMount() {
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    }

    changeCommentText = (text) => {
        this.props.changeCommentText(text);
    };

    addNewCommentary = () => {
        this.props.addNewComment(this.props.match.params.postId, this.props.commentText);
        this.props.changeCommentText('');
        this.props.getPostComments(this.props.sectionId, this.props.match.params.postId);
    };

    render() {
        return <Comments comments={this.props.postComments}
                         commentText={this.props.commentText}
                         changeCommentText={this.changeCommentText}
                         addNewCommentary={this.addNewCommentary}/>
    }

}

let mapStateToProps = (state) => {
    return {
        commentText: state.commentsData.commentText,
        sectionId: state.headerData.sectionId,
        postComments: state.commentsData.postComments
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        changeCommentText: (text) => dispatch(changeCommentTextAction(text)),
        getPostComments: (sectionId, postId) => dispatch(getPostComments(sectionId, postId)),
        addNewComment: (postId, commentText) => dispatch(sendNewPostComment(postId, commentText))
    }
};

let withUrlDataComponent = withRouter(CommentsWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(withUrlDataComponent);