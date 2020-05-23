import React from 'react'
import PostItem from './PostItem/PostItem'
import PagesNavigationWrapper from './PagesNavigation/PagesNavigationWrapper'
import {Post} from '../../../models/PostModel'

interface Props {
    posts: Array<Post>
}

/**
 * Список постов
 * @param posts
 */
const PostsList: React.FC<Props> = ({posts}) => {
    return (
        <div>
            <PagesNavigationWrapper/>
            {
                posts.map(post => {
                    return <PostItem post={post}
                                     key={post.id}/>
                })
            }
            <PagesNavigationWrapper/>
        </div>
    )
}

export default PostsList