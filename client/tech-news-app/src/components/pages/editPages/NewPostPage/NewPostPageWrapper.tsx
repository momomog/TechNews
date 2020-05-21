import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {withRouter} from 'react-router-dom'
import NewPostPage from './NewPostPage'
import {getSectionName} from '../../../../common/Const'
import {NotificationManager} from 'react-notifications'
import PostAPI from '../../../../api/PostAPI'
import {ChangeSectionAction} from '../../../../models/PostModel'
import {RouteComponentProps} from 'react-router'
import {PostRequest} from '../../../../models/RequestsModel'
import {changeSection, getPosts, setPostPageAction} from '../../../../redux/actions/postActions'

interface Props {
    changeSection: (sectionId: number) => ChangeSectionAction
    setPostPage: () => void
    getPosts: (sectionId: number) => void
}

/**
 *
 * @param changeSection
 * @param setPostPage
 * @param getPosts
 * @param history
 * Оболочка Новый пост
 */
const NewPostPageWrapper: React.FC<RouteComponentProps<any> & Props> = ({changeSection, setPostPage, getPosts, history}) => {

    const createNewPost = (formData: PostRequest) => {
        PostAPI.onCreateNewPost({
            title: formData.title,
            preDescription: formData.preDescription,
            fullDescription: formData.fullDescription,
            categoryId: formData.categoryId
        }, formData.photo && formData.photo[0])
            .then(() => {
                changeSection(formData.categoryId)
                setPostPage()
                getPosts(formData.categoryId)
                history.push(`/posts/${getSectionName(formData.categoryId)}`)
                window.scroll(0, 0)
            })
            .catch(() => NotificationManager.error('Не удалось создать новый пост', 'Ошибка'))
    }

    return <NewPostPage createNewPost={createNewPost}/>
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changeSection: sectionId => dispatch(changeSection(sectionId)),
        setPostPage: () => dispatch(setPostPageAction()),
        getPosts: sectionId => dispatch(getPosts(sectionId))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(NewPostPageWrapper))