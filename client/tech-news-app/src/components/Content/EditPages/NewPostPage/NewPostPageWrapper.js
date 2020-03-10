import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import NewPostPage from "./NewPostPage";
import Common from "../../../../common/Common";
import {getSectionName} from "../../../../common/Const";
import {NotificationManager} from "react-notifications";
import PostAPI from "../../../../api/PostAPI";

class NewPostPageWrapper extends React.Component {
    createNewPost = (formData) => {
        PostAPI.onCreateNewPost({
            title: formData.title,
            preDescription: formData.preDescription,
            fullDescription: formData.fullDescription,
            categoryId: formData.categoryId
        }, formData.photo[0])
            .catch(function (error) {
                NotificationManager.error('Не удалось создать новый пост', 'Ошибка');
            });

        Common.changeLocation('/posts/' + getSectionName(Number(formData.categoryId)));
    };

    render() {
        return <NewPostPage createNewPost={this.createNewPost}/>
    }
}

let mapStateToProps = (state) => {
    return {}
};

let mapDispatchToProps = (dispatch) => {
    return {}
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(NewPostPageWrapper);