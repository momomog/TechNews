import React, {useState} from 'react'
import RecommendedPosts from './RecommendedPosts'
import PostAPI from '../../../../api/PostAPI'
import {Post} from '../../../../models/PostModel'

interface Props {
    categoryId: number
    postId: number
    isVisible?: boolean
}

/**
 * Оболочка Рекомендуемые посты
 * @param categoryId
 * @param postId
 * @param isVisible
 */
const RecommendedPostsWrapper: React.FC<Props> = ({categoryId, postId, isVisible}) => {
    const [posts, setPosts] = useState<Array<Post>>([])

    if (categoryId && isVisible && !posts.length) {
        PostAPI.getRecommendedPosts(categoryId, postId)
            .then((response: Array<Post>) => setPosts(response))
    }

    return isVisible ? <RecommendedPosts posts={posts}/> : <div/>
}

export default RecommendedPostsWrapper