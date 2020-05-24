import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import PostReview from './PostReview'
import {useRouteMatch} from 'react-router-dom'
import {Dispatch} from 'redux'
import PostAPI from '../../../api/PostAPI'
import {Post} from '../../../models/PostModel'
import Spinner from '../../core/Spinner'
import {getPostById} from '../../../redux/actions/postActions'
import {RootState} from '../../../redux/reducers/rootReducer'

interface Props {
    postData: Post
    sectionId: number
    getPostById: (sectionId: number, postId: number) => void
}

/**
 * Просмотр содержимого поста. Оболочка
 * @param postData
 * @param sectionId
 * @param getPostById
 */
const PostReviewWrapper: React.FC<Props> = ({postData, sectionId, getPostById}) => {
    const {params}: any = useRouteMatch()

    useEffect(() => {
        getPostById(sectionId, params.postId)
    }, [params, getPostById, sectionId])

    const postRating = (postId: number, rate: number) => PostAPI.ratePost(postId, rate)

    return postData.id
        ? <PostReview post={postData}
                      postRating={postRating}/>
        : <Spinner/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostReviewWrapper)