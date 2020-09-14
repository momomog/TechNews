import React from 'react'
import PostItem from './PostItem'
import PagesNavigationWrapper from './PagesNavigation/PagesNavigationWrapper'
import {Post} from '../../../models/PostModel'

interface Props {
    posts: Array<Post>
    clearPostData: () => void
}

/**
 * Список постов
 */
const PostsList: React.FC<Props> = ({posts, clearPostData}) => {
    return (
        <>
            <PagesNavigationWrapper/>
            {
                posts.map(post => {
                    return <PostItem post={post}
                                     clearPostData={clearPostData}
                                     key={post.id}/>
                })
            }
            <PagesNavigationWrapper/>
        </>
    )
}

export default PostsList