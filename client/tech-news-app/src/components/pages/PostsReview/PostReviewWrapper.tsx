import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PostReview from './PostReview'
import {useRouteMatch} from 'react-router-dom'
import PostAPI from '../../../api/PostAPI'
import Spinner from '../../core/Spinner'
import {getPostById} from '../../../redux/actions/postActions'
import {RootState} from '../../../redux/reducers/rootReducer'

/**
 * Просмотр содержимого поста. Оболочка
 */
const PostReviewWrapper: React.FC = () => {
    const {params}: any = useRouteMatch()
    const {postData, sectionId} = useSelector((state: RootState) => state.postsData)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPostById(params.postId))
    }, [params.postId, sectionId])

    const postRating = (postId: number, rate: number) => PostAPI.ratePost(postId, rate)

    return postData.id
        ? <PostReview post={postData}
                      postRating={postRating}/>
        : <Spinner/>
}

export default PostReviewWrapper