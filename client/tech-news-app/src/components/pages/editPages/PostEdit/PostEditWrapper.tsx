import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {match, useHistory, useRouteMatch} from 'react-router-dom'
import PostEdit from './PostEdit'
import {NotificationManager} from 'react-notifications'
import PostAPI from '../../../../api/PostAPI'
import {PostRequest} from '../../../../models/RequestsModel'
import {getPostById} from '../../../../redux/actions/postActions'
import {postsDataSelector} from '../../../../redux/selectors/selectors'
import {PostState} from '../../../../models/PostModel'
import {Dispatch} from 'redux'
import {History} from 'history'


/**
 * Редактор поста. Оболочка
 */
const PostEditWrapper: React.FC = () => {
    const {params}: match<{postId: string}> = useRouteMatch(),
        history: History = useHistory(),
        {postData, sectionId}: PostState = useSelector(postsDataSelector),
        dispatch: Dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPostById(+params.postId))
    }, [params.postId, sectionId])

    const updatePostData = async (formData: PostRequest) => {
        try {
            const request = {
                title: formData.title,
                preDescription: formData.preDescription,
                fullDescription: formData.fullDescription,
                categoryId: formData.categoryId
            }
            const photo = formData.photo && formData.photo[0]

            await PostAPI.updatePostData(+params.postId, request, photo)
            NotificationManager.success('Данные поста успешно обновлены', 'Успешно')
            history.goBack()
        } catch (e) {
            NotificationManager.error('Не удалось обновить данные поста', 'Ошибка')
        }
    }

    return postData
        ? <PostEdit post={postData}
                    updatePostData={updatePostData}/>
        : null
}

export default PostEditWrapper
