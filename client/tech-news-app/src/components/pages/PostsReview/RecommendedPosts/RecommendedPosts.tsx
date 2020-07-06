import React from 'react'
import Spinner from '../../../core/Spinner'
import {NavLink} from 'react-router-dom'
import {Post} from '../../../../models/PostModel'


/**
 * Рекомендуемый пост
 * @param post
 */
const PostItem: React.FC<{ post: Post }> = ({post}) => {

    const linkPropInit = () => {
        return {pathname: `/redirect-to/post`, redirectUrl: `/posts/post/${post && post.id}`}
    }

    return (
        <div className="col-sm-4 mb-3 d-flex justify-content-center">
            <div className="recommend-post">
                <div className="post-rec mb-3">
                    <img className="center-block" alt="Card"
                         // src={`https://drive.google.com/uc?export=view&id=${post.photoId}`}/>
                         src={post.photoId}/>
                </div>
                <div className="text-center">
                    <NavLink to={linkPropInit()}>
                        {post.title}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}


/**
 * Рекомендуемые посты
 * @param posts
 */
const RecommendedPosts: React.FC<{ posts: Array<Post> }> = ({posts}) => {
    return (
        <div>
            <hr className="mt-3"/>
            <h2 className="mb-5">Вам может быть интересно</h2>

            {
                posts.length
                    ? <div className="row">
                        {
                            posts.map(post => <PostItem key={post.id}
                                                        post={post}/>)
                        }
                    </div>
                    : <Spinner/>
            }

        </div>
    )
}

export default RecommendedPosts