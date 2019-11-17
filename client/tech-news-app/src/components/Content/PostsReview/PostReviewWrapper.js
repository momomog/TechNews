import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import PostReview from "./PostReview";
import {compose} from "redux";
import {getPostData} from "../../../redux/PostsReducer";

class PostReviewWrapper extends React.Component {

    componentDidMount() {
        this.props.getPostData(this.props.currentSectionId, this.props.match.params.postId);
    }

    render() {
        return <PostReview post={this.props.currentPostData}/>
    }

}

let mapStateToProps = (state) => {
    return {
        currentPostData: state.postsData.currentPostData,
        currentSectionId: state.headerData.currentSectionId,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
         getPostData: (sectionId, postId) => dispatch(getPostData(sectionId, postId))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(PostReviewWrapper);