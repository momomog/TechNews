import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import PostReview from './PostReview'
import {useRouteMatch} from 'react-router-dom'
import {Dispatch} from 'redux'
import PostAPI from '../../../api/PostAPI'
import {Post} from '../../../models/PostModel'
import {User} from '../../../models/UserModel'
import Spinner from '../../core/Spinner'
import {getPostById} from '../../../redux/actions/postActions'
import {RootState} from '../../../redux/reducers/rootReducer'

interface Props {
    postData: Post
    sectionId: number
    userData: User
    getPostById: (sectionId: number, postId: number) => void
}

/**
 * Просмотр содержимого поста. Оболочка
 * @param postData
 * @param sectionId
 * @param userData
 * @param getPostById
 */
const PostReviewWrapper: React.FC<Props> = ({postData, sectionId, userData, getPostById}) => {
    const {params}: any = useRouteMatch()

    useEffect(() => {
        getPostById(sectionId, params.postId)
    }, [params, getPostById, sectionId])

    const postRating = (postId: number, rate: number) => PostAPI.ratePost(postId, rate)

    return postData.id
        ? <PostReview post={postData}
                      user={userData}
                      postRating={postRating}/>
        : <Spinner/>
}

const mapStateToProps = (state: RootState) => {
    return {
        postData: state.postsData.postData,
        sectionId: state.postsData.sectionId,
        userData: state.userData.userData
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPostById: (sectionId: number, postId: number) => dispatch(getPostById(sectionId, postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostReviewWrapper)