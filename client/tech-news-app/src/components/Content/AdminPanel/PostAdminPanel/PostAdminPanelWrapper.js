import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import PostAdminPanel from "./PostAdminPanel";
import Common from "../../../../common/Common";
import PostAPI from "../../../../api/PostAPI";
import {NotificationManager} from "react-notifications";

class PostAdminPanelWrapper extends React.Component {

    deletePostById = () => {
        const postId = this.props.postId;

        PostAPI.deletePostById(this.props.postId)
            .then(response => {
                NotificationManager.success(`Пост номер ${postId} успешно удален`, 'Успешно');
            })
            .catch(function (error) {
                NotificationManager.error(`Не удалось удалить пост номер ${postId}`, 'Ошибка');
            });

        Common.changeLocation('/posts/all', 400);
    };

    render() {
        return <PostAdminPanel postId={this.props.postId}
                               deletePostById={this.deletePostById}/>
    }
}

let mapStateToProps = (state) => {
    return {}
};

let mapDispatchToProps = (dispatch) => {
    return {}
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(PostAdminPanelWrapper);