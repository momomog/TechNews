import React from 'react'
import PostItem from './PostItem'
import PagesNavigationWrapper from './PagesNavigation/PagesNavigationWrapper'
import {Post} from '../../../models/PostModel'

interface Props {
    posts: Array<Post>
}

/**
 * Список постов
 */
const PostsList: React.FC<Props> = ({posts}) => {
    return (
        <>
            <PagesNavigationWrapper/>
            {
                posts.map(post => <PostItem post={post}
                                            key={post.id}/>
                )
            }
            <PagesNavigationWrapper/>
        </>
    )
}

export default PostsList