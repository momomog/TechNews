import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import PostAdminPanel from './PostAdminPanel'
import PostAPI from '../../../../api/PostAPI'
import {NotificationManager} from 'react-notifications'
import {getPosts} from '../../../../redux/actions/postActions'
import {RootState} from '../../../../redux/reducers/rootReducer'

interface Props {
    postId: number
}

/**
 * Панель управления постом. Оболочка
 */
const PostAdminPanelWrapper: React.FC<Props> = ({postId}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {sectionId} = useSelector((state: RootState) => state.postsData)

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