import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import PostAdminPanel from './PostAdminPanel'
import PostAPI from '../../../../api/PostAPI'
import {NotificationManager} from 'react-notifications'
import {getPosts} from '../../../../redux/actions/postActions'
import {postsDataSelector} from '../../../../redux/selectors/selectors'
import {History} from 'history'
import {Dispatch} from "redux";
import {PostState} from "../../../../models/PostModel";

interface Props {
    postId: number
}

/**
 * Панель управления постом. Оболочка
 */
const PostAdminPanelWrapper: React.FC<Props> = ({postId}) => {
    const history: History = useHistory()
    const dispatch: Dispatch = useDispatch()
    const {sectionId}: PostState = useSelector(postsDataSelector)

    const deletePostById = async () => {
        try {
            await PostAPI.deletePostById(postId)
            dispatch(getPosts(sectionId))
            setTimeout(() => {
                history.goBack()
                NotificationManager.success(`Пост номер ${postId} успешно удален`, 'Успешно')
            }, 1000)
        } catch (e) {
            NotificationManager.error(`Не удалось удалить пост номер ${postId}`, 'Ошибка')
        }
    }

    return <PostAdminPanel postId={postId}
                           onDeletePost={deletePostById}/>
}


export default PostAdminPanelWrapper