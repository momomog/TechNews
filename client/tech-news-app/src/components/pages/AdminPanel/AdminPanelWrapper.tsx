import React from 'react'
import AdminPanel from './AdminPanel'
import PostAPI from '../../../api/PostAPI'
import {NotificationManager} from 'react-notifications'
import {postInitProcess} from './postCreator'

/**
 * Панель администратора. Оболочка
 */
const AdminPanelWrapper: React.FC = () => {

    const deletePostById = async (postId: number) => {
        try {
            await PostAPI.deletePostById(postId)
            NotificationManager.success(`Пост номер ${postId} успешно удален`, 'Успешно')
        } catch (e) {
            NotificationManager.error(`Не удалось удалить пост номер ${postId}`, 'Ошибка')
        }
    }

    const updatePosts = async (day, month, postNum) => {
        try {
            const post = await postInitProcess(day, month, postNum)
            await PostAPI.createNewPostFromOuterSrc(post)

            if (post) {
                setTimeout(() => updatePosts(day, month, post.postNum), 3000)
            }
        } catch (e) {
            setTimeout(() => updatePosts(day, month, ++postNum), 3000)
        }
    }

    return <AdminPanel updatePosts={updatePosts}
                       deletePostById={deletePostById}/>
}

export default AdminPanelWrapper
