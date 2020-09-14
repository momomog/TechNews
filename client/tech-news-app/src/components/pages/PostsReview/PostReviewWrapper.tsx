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
    getPostById: (postId: number) => void
}

/**
 * Просмотр содержимого поста. Оболочка
 */
const PostReviewWrapper: React.FC<Props> = ({postData, sectionId, getPostById}) => {
    const {params}: any = useRouteMatch()

    useEffect(() => {
        getPostById(params.postId)
    }, [params.postId, sectionId])

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
        getPostById: (postId: number) => dispatch(getPostById(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostReviewWrapper)