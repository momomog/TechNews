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
    getPostById: (postId: number) => void
}

/**
 * Редактор поста. Оболочка
 */
const PostEditWrapper: React.FC<Props> = ({sectionId, postData, getPostById}) => {
    const {params}: any = useRouteMatch()
    const history = useHistory()

    useEffect(() => {
        getPostById(params.postId)
    }, [params.postId, sectionId])

    const updatePostData = (formData: PostRequest) => {
        const request = {
            title: formData.title,
            preDescription: formData.preDescription,
            fullDescription: formData.fullDescription,
            categoryId: formData.categoryId
        }
        const photo = formData.photo && formData.photo[0]

        PostAPI.updatePostData(params.postId, request, photo)
            .then(() => {
                NotificationManager.success('Данные поста успешно обновлены', 'Успешно')
                history.goBack()
            })
            .catch(() => NotificationManager.error('Не удалось обновить данные поста', 'Ошибка'))
    }

    return postData
        ? <PostEdit post={postData}
                    updatePostData={updatePostData}/>
        : null
}

const mapStateToProps = (state: RootState) => {
    return {
        postData: state.postsData.postData,
        sectionId: state.postsData.sectionId
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPostById: (postId: number) => dispatch(getPostById(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditWrapper)