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
 * @param posts
 * @param clearPostData
 */
const PostsList: React.FC<Props> = ({posts, clearPostData}) => {
    return (
        <div>
            <PagesNavigationWrapper/>
            {
                posts.map(post => {
                    return <PostItem post={post}
                                     clearPostData={clearPostData}
                                     key={post.id}/>
                })
            }
            <PagesNavigationWrapper/>
        </div>
    )
}

export default PostsList