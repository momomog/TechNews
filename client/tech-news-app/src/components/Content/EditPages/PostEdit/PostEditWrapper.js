import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Common from "../../../../common/Common";
import PostEdit from "./PostEdit";
import {getPostData, updatePostData} from "../../../../redux/PostsReducer";

class PostEditWrapper extends React.Component {

    componentDidMount() {
        this.props.getPostData(this.props.sectionId, this.props.match.params.postId);
    }

    updatePostData = (postDataRequest) => {
        this.props.updatePostData(this.props.match.params.postId, postDataRequest);
        let path = '/posts/' + this.props.match.params.sectionName + '/post/' + this.props.match.params.postId;
        Common.changeLocation(path, 700);
    };

    render() {
        return <PostEdit post={this.props.postData}
                         sectionName={this.props.match.params.sectionName}
                         updatePostData={this.updatePostData}/>
    }
}

let mapStateToProps = (state) => {
    return {
        postData: state.postsData.postData,
        sectionId: state.authData.sectionId
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        getPostData: (sectionId, postId) => dispatch(getPostData(sectionId, postId)),
        updatePostData: (postId, postDataRequest) => dispatch(updatePostData(postId, postDataRequest)),
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(PostEditWrapper);