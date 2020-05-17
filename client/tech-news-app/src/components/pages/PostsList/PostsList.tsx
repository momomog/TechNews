import React from 'react'
import PostItem from './PostItem/PostItem'
import PagesNavigationWrapper from './PagesNavigation/PagesNavigationWrapper'
import {Post} from '../../../models/PostModel'

interface Props {
    posts: Array<Post>
    setPostId: (id: number) => void
}

/**
 *
 * @param posts
 * @param setPostId
 * Список постов
 */
const PostsList: React.FC<Props> = ({posts, setPostId}) => {

    return (
        <div>
            <PagesNavigationWrapper/>

            {
                posts.map(post => {
                    return <PostItem post={post}
                                     setPostId={setPostId}
                                     key={post.id}/>
                })
            }

            <PagesNavigationWrapper/>
        </div>
    )
}

export default PostsList