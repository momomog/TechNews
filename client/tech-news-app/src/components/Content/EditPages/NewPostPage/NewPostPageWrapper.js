import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import NewPostPage from "./NewPostPage";
import {createNewPost} from "../../../../redux/PostsReducer";
import Common from "../../../../common/Common";
import {getSectionName} from "../../../../common/Const";
import {NotificationManager} from "react-notifications";

class NewPostPageWrapper extends React.Component {

    createNewPost = (postDataRequest, photoBody) => {
        let isError = [];

        isError.push(Common.onValidBeforePostSave(postDataRequest.title, 'Заголовок', 50, 200));
        isError.push(Common.onValidBeforePostSave(postDataRequest.preDescription, 'Краткое описание', 200, 1000));
        isError.push(Common.onValidBeforePostSave(postDataRequest.fullDescription, 'Описание', 1000, 20000));

        if (!postDataRequest.categoryId) {
            NotificationManager.error('Необходимо выбрать категорию', 'Категория');
            return;
        }

        if (isError.indexOf(false) !== -1)
            return;

        this.props.createNewPost(postDataRequest, photoBody);
        Common.changeLocation('/posts/' + getSectionName(Number(postDataRequest.categoryId)));
    };

    render() {
        return <NewPostPage createNewPost={this.createNewPost}/>
    }
}

let mapStateToProps = (state) => {
    return {}
};

let mapDispatchToProps = (dispatch) => {
    return {
        createNewPost: (postDataRequest, photoBody) => dispatch(createNewPost(postDataRequest, photoBody))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(NewPostPageWrapper);