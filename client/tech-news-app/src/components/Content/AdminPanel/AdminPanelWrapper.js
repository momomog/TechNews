import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import AdminPanel from "./AdminPanel";
import {deletePostById} from "../../../redux/PostsReducer";

class AdminPanelWrapper extends React.Component {

    deletePostById = (postId) => {
        this.props.deletePostById(postId);
    };

    render() {
        return <AdminPanel deletePostById={this.deletePostById}/>
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

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(AdminPanelWrapper);