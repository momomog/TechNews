import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import PostAdminPanel from "./PostAdminPanel";
import {deletePostById} from "../../../../redux/PostsReducer";
import Common from "../../../../common/Common";

class PostAdminPanelWrapper extends React.Component {

    deletePostById = () => {
        this.props.deletePostById(this.props.postId);
        Common.changeLocation('/posts/all', 400);
    };

    render() {
        return <PostAdminPanel deletePostById={this.deletePostById}/>
    }
}

let mapStateToProps = (state) => {
    return {
        // postData: state.postsData.postData,
        // sectionId: state.authData.sectionId,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        deletePostById: (postId) => dispatch(deletePostById(postId))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(PostAdminPanelWrapper);