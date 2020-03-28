import React from 'react';
import Spinner from "../../../core/Spinner";
import {NavLink} from "react-router-dom";
import {Post} from "../../../../models/PostModel";

interface RecPost {
    post: Post
}

/**
 *
 * @param post
 * Рекомендуемый пост
 */
const PostItem: React.FC<RecPost> = ({post}) => {

    const linkPropInit = () => {
        return {pathname: `/redirect-to/post`, redirectUrl: `/posts/post/${post && post.id}`}
    }

    return (
        <div className="col-sm-4 mb-3 d-flex justify-content-center">
            <div className="recommend-post">
                <div className="post-rec mb-3">
                    <img className="center-block" alt="Card"
                         src={`https://drive.google.com/uc?export=view&id=${post.photoId}`}/>
                </div>
                <div className="text-center" onClick={() => window.scroll(0, 0)}>
                    <NavLink to={linkPropInit()}>
                        {post.title}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}


interface RecPosts {
    posts: Array<Post>
}

/**
 *
 * @param posts
 * Рекомендуемые посты
 */
const RecommendedPosts: React.FC<RecPosts> = ({posts}) => {
    return (
        <div>
            <hr className="mt-3"/>
            <h2 className="mb-5">Вам может быть интересно</h2>

            {
                posts
                    ? <div>
                        <div className="row">
                            {
                                posts.map(post => <PostItem post={post}/>)
                            }
                        </div>
                    </div>
                    : <Spinner/>
            }

        </div>
    )
}

export default RecommendedPosts