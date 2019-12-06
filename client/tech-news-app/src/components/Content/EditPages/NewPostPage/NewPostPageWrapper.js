import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import NewPostPage from "./NewPostPage";
import {createNewPost} from "../../../../redux/PostsReducer";

class NewPostPageWrapper extends React.Component {

    createNewPost = (postDataRequest, photoBody) => {
        this.props.createNewPost(postDataRequest, photoBody);

        // if (photoBody)
        //     this.props.updatePostPhoto(this.props.match.params.postId, photoBody);
        // let path = '/posts/' + this.props.match.params.sectionName + '/post/' + this.props.match.params.postId;
        // Common.changeLocation(path, 700);
    };

    render() {
        return <NewPostPage createNewPost={this.createNewPost}/>
    }
}

let mapStateToProps = (state) => {
    return {
        // postData: state.postsData.postData,
        // sectionId: state.authData.sectionId
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        // getPostData: (sectionId, postId) => dispatch(getPostData(sectionId, postId)),
        createNewPost: (postDataRequest, photoBody) => dispatch(createNewPost(postDataRequest, photoBody)),
        // createPostPhoto: (postId, photoBody) => dispatch(createPostPhoto(postId, photoBody)),
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(NewPostPageWrapper);