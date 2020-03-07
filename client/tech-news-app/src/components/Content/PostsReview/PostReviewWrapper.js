import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import PostReview from "./PostReview";
import {compose} from "redux";
import {getPostData} from "../../../redux/PostsReducer";
import PostAPI from "../../../api/PostAPI";

class PostReviewWrapper extends React.Component {

    componentDidMount() {
        this.props.getPostData(this.props.sectionId, this.props.match.params.postId);
    }

    postRating(rate) {
        PostAPI.ratePost(this.post.id, rate)
    }

    render() {
        return <PostReview
            post={this.props.postData}
            user={this.props.currentUserData}
            postRating={this.postRating}/>
    }
}

let mapStateToProps = (state) => {
    return {
        postData: state.postsData.postData,
        sectionId: state.userData.sectionId,
        currentUserData: state.userData.currentUserData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        getPostData: (sectionId, postId) => dispatch(getPostData(sectionId, postId))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(PostReviewWrapper);