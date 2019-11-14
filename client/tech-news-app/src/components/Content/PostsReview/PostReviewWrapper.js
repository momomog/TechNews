import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import PostReview from "./PostReview";
import {compose} from "redux";

class PostReviewWrapper extends React.Component {

    // загрузка данных поста с сервера
    // componentDidMount() {
    //     this.props.getPostData(this.props.match.params.postId);
    // }

    render() {
        return <PostReview post={this.props.currentPostData}/>
    }

}

let mapStateToProps = (state) => {
    return {
        currentPostData: state.postsData.currentPostData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        // getPostData: postId => dispatch(getPostData(postId))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(PostReviewWrapper);