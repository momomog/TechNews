import React from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import NewPostPage from './NewPostPage'
import {getSectionName} from '../../../../common/Const'
import {NotificationManager} from 'react-notifications'
import PostAPI from '../../../../api/PostAPI'
import {PostRequest} from '../../../../models/RequestsModel'
import {changeSection, getPosts, setPostPageAction} from '../../../../redux/actions/postActions'
import {Dispatch} from 'redux'


/**
 * Новый пост. Оболочка
 */
const NewPostPageWrapper: React.FC = () => {
    const dispatch: Dispatch = useDispatch(),
        history: History = useHistory()

    const createNewPost = async (formData: PostRequest) => {
        try {
            await PostAPI.createNewPost({
                title: formData.title,
                preDescription: formData.preDescription,
                fullDescription: formData.fullDescription,
                categoryId: formData.categoryId
            }, formData.photo && formData.photo[0])

            dispatch(changeSection(formData.categoryId))
            dispatch(setPostPageAction())
            dispatch(getPosts(formData.categoryId))
            history.push(`/posts/${getSectionName(formData.categoryId)}`)
        } catch (e) {
            NotificationManager.error('Не удалось создать новый пост', 'Ошибка')
        }
    }

    return <NewPostPage createNewPost={createNewPost}/>
}

export default NewPostPageWrapper