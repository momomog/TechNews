import React from 'react';
import AdminPanel from "./AdminPanel";
import PostAPI from "../../../api/PostAPI";
import {NotificationManager} from "react-notifications";

const AdminPanelWrapper: React.FC = props => {

    const deletePostById = (postId: number) => {
        PostAPI.deletePostById(postId)
            .then(response => {
                NotificationManager.success(`Пост номер ${postId} успешно удален`, 'Успешно')
            })
            .catch(function (error) {
                NotificationManager.error(`Не удалось удалить пост номер ${postId}`, 'Ошибка')
            })
    }

    return <AdminPanel deletePostById={deletePostById}/>
}


export default AdminPanelWrapper