import React from 'react';
import AdminPanel from "./AdminPanel";
import PostAPI from "../../../api/PostAPI";
import {NotificationManager} from "react-notifications";

/**
 *
 * Оболочка Панель администратора
 */
const AdminPanelWrapper: React.FC = () => {

    const deletePostById = (postId: number) => {
        PostAPI.deletePostById(postId)
            .then(() => NotificationManager.success(`Пост номер ${postId} успешно удален`, 'Успешно'))
            .catch(() => NotificationManager.error(`Не удалось удалить пост номер ${postId}`, 'Ошибка'))
    }

    return <AdminPanel deletePostById={deletePostById}/>
}


export default AdminPanelWrapper