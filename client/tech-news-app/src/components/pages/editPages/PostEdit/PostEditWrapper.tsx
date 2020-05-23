import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {useHistory, useRouteMatch} from 'react-router-dom'
import PostEdit from './PostEdit'
import {NotificationManager} from 'react-notifications'
import PostAPI from '../../../../api/PostAPI'
import {Post} from '../../../../models/PostModel'
import {PostRequest} from '../../../../models/RequestsModel'
import {getPostById} from '../../../../redux/actions/postActions'
import {RootState} from '../../../../redux/reducers/rootReducer'

interface Props {
    postData: Post
    sectionId: number
    getPostById: (sectionId: number, postId: number) => void
}

/**
 * Оболочка Редактор поста
 * @param sectionId
 * @param postData
 * @param getPostById
 */
const PostEditWrapper: React.FC<Props> = ({sectionId, postData, getPostById}) => {
    const {params}: any = useRouteMatch()
    const history = useHistory()

    useEffect(() => {
        getPostById(sectionId, params.postId)
    }, [params, getPostById, sectionId])

    const updatePostData = (formData: PostRequest) => {
        const request = {
            title: formData.title,
            preDescription: formData.preDescription,
            fullDescription: formData.fullDescription,
            categoryId: formData.categoryId
        }
        const photo = formData.photo && formData.photo[0]

        PostAPI.onUpdatePostData(params.postId, request, photo)
            .then(() => {
                NotificationManager.success('Данные поста успешно обновлены', 'Успешно')
                history.goBack()
            })
            .catch(() => NotificationManager.error('Не удалось обновить данные поста', 'Ошибка'))
    }

    return postData
        ? <PostEdit post={postData}
                    updatePostData={updatePostData}/>
        : <div/>
}

const mapStateToProps = (state: RootState) => {
    return {
        postData: state.postsData.postData,
        sectionId: state.postsData.sectionId
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPostById: (sectionId: number, postId: number) => dispatch(getPostById(sectionId, postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditWrapper)