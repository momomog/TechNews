import React from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Dispatch} from 'redux'
import PostAdminPanel from './PostAdminPanel'
import PostAPI from '../../../../api/PostAPI'
import {NotificationManager} from 'react-notifications'
import {getPosts} from '../../../../redux/actions/postActions'
import {RootState} from '../../../../redux/reducers/rootReducer'

interface Props {
    sectionId: number
    postId: number
    getPosts: (sectionId) => void
}

/**
 * Панель управления постом. Оболочка
 */
const PostAdminPanelWrapper: React.FC<Props> = ({getPosts, sectionId, postId}) => {
    const history = useHistory()

    const deletePostById = () => {
        PostAPI.deletePostById(postId)
            .then(() => {
                getPosts(sectionId)

                setTimeout(() => {
                    history.goBack()
                    NotificationManager.success(`Пост номер ${postId} успешно удален`, 'Успешно')
                }, 1000)
            })
            .catch(() => NotificationManager.error(`Не удалось удалить пост номер ${postId}`, 'Ошибка'))
    }

    return <PostAdminPanel postId={postId}
                           onDeletePost={deletePostById}/>
}

const mapStateToProps = (state: RootState) => {
    return {
        sectionId: state.postsData.sectionId
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPosts: (sectionId: number) => dispatch(getPosts(sectionId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAdminPanelWrapper)