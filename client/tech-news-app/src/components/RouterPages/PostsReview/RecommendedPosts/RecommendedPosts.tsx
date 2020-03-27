import React from 'react';
import Spinner from "../../../core/Spinner";
import {NavLink} from "react-router-dom";
import {Post} from "../../../../models/PostModel";

interface RecPost {
    post: Post
}

const PostItem: React.FC<RecPost> = ({post}) => {
    if (!post) return <div/>

    function linkPropInit() {
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

const RecommendedPosts: React.FC<RecPosts> = ({posts}) => {
    return (
        <div>
            <hr className="mt-3"/>
            <h2 className="mb-5">Вам может быть интересно</h2>

            {
                posts
                    ? <div>
                        <div className="row">
                            <PostItem post={posts[0]}/>
                            <PostItem post={posts[1]}/>
                            <PostItem post={posts[2]}/>
                        </div>
                    </div>
                    : <Spinner/>
            }

        </div>
    )
}

export default RecommendedPosts