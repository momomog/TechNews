import React from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Dispatch} from 'redux'
import PostAdminPanel from './PostAdminPanel'
import PostAPI from '../../../../api/PostAPI'
import {NotificationManager} from 'react-notifications'
import {getSectionName} from '../../../../common/Const'
import {RootState} from '../../../../redux/reduxStore'
import {setPostPageAndGetPosts} from '../../../../redux/actions/postActions'

interface Props {
    sectionId: number
    postId: number
    setPostPageAndGetPosts: (sectionId, postPage) => void
}

/**
 * Панель управления постом. Оболочка
 * @param setPostPageAndGetPosts
 * @param sectionId
 * @param postId
 */
const PostAdminPanelWrapper: React.FC<Props> = ({setPostPageAndGetPosts, sectionId, postId}) => {
    const history = useHistory()

    const deletePostById = () => {
        PostAPI.deletePostById(postId)
            .then(() => {
                setPostPageAndGetPosts(sectionId, 1)

                setTimeout(() => {
                    window.scroll(0, 0)
                    history.push(`/posts/${getSectionName(sectionId)}`)
                    NotificationManager.success(`Пост номер ${postId} успешно удален`, 'Успешно')
                }, 2000)
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
        setPostPageAndGetPosts: (sectionId: number, postPage: number) => dispatch(setPostPageAndGetPosts(sectionId, postPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAdminPanelWrapper)