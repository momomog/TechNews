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
 * Рекомендуемые посты. Оболочка
 */
const RecommendedPostsWrapper: React.FC<Props> = ({categoryId, postId, isVisible}) => {
    const [posts, setPosts] = useState<Array<Post>>([]);

    (async () => {
        try {
            if (categoryId && isVisible && !posts.length) {
                const posts = await PostAPI.getRecommendedPosts(categoryId, postId)
                setPosts(posts)
            }
        } catch (e) {
        }
    })()

    return isVisible ? <RecommendedPosts posts={posts}/> : <div/>
}

export default RecommendedPostsWrapper