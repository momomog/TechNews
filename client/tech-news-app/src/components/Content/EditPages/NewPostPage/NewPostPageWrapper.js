import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import NewPostPage from "./NewPostPage";
import {createNewPost} from "../../../../redux/PostsReducer";
import Common from "../../../../common/Common";
import {getSectionName} from "../../../../common/Const";

class NewPostPageWrapper extends React.Component {

    createNewPost = (postDataRequest, photoBody) => {
        this.props.createNewPost(postDataRequest, photoBody);
        Common.changeLocation('/posts/' + getSectionName(postDataRequest.categoryId));
    };

    render() {
        return <NewPostPage createNewPost={this.createNewPost}/>
    }
}

let mapStateToProps = (state) => {
    return {
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        createNewPost: (postDataRequest, photoBody) => dispatch(createNewPost(postDataRequest, photoBody))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(NewPostPageWrapper);