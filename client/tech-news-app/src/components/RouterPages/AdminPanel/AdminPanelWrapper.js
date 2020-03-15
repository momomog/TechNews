import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import AdminPanel from "./AdminPanel";
import PostAPI from "../../../api/PostAPI";
import {NotificationManager} from "react-notifications";

class AdminPanelWrapper extends React.Component {

    deletePostById = postId => {
        PostAPI.deletePostById(postId)
            .then(response => {
                NotificationManager.success(`Пост номер ${postId} успешно удален`, 'Успешно')
            })
            .catch(function (error) {
                NotificationManager.error(`Не удалось удалить пост номер ${postId}`, 'Ошибка')
            })
    }

    render() {
        return <AdminPanel deletePostById={this.deletePostById}/>
    }
}

let mapStateToProps = state => {
    return {}
};

let mapDispatchToProps = dispatch => {
    return {}
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(AdminPanelWrapper)