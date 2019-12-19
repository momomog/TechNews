import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Common from "../../../../common/Common";
import PostEdit from "./PostEdit";
import {getPostData, updatePostData, updatePostPhoto} from "../../../../redux/PostsReducer";
import {NotificationManager} from "react-notifications";

class PostEditWrapper extends React.Component {

    componentDidMount() {
        this.props.getPostData(this.props.sectionId, this.props.match.params.postId);
    }

    updatePostData = (postDataRequest, photoBody) => {
        let isError = [];

        debugger;
        isError.push(Common.onValidBeforePostSave(postDataRequest.title, 'Заголовок', 50, 200));
        isError.push(Common.onValidBeforePostSave(postDataRequest.preDescription, 'Краткое описание', 200, 1000));
        isError.push(Common.onValidBeforePostSave(postDataRequest.fullDescription, 'Описание', 1000, 20000));

        if (!postDataRequest.categoryId) {
            NotificationManager.error('Необходимо выбрать категорию', 'Категория');
            return;
        }

        if (isError.indexOf(false) !== -1)
            return;

        this.props.updatePostData(this.props.match.params.postId, postDataRequest);

        if (photoBody)
            this.props.updatePostPhoto(this.props.match.params.postId, photoBody);
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
        updatePostPhoto: (postId, photoBody) => dispatch(updatePostPhoto(postId, photoBody)),
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(PostEditWrapper);