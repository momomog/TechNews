import React from 'react';
import Spinner from "../../../core/Spinner";
import {NavLink} from "react-router-dom";

const Post = ({post}) => {
    return (
        <div className="col-sm-4 mb-3 d-flex justify-content-center">
            <div className="recommend-post">
                <div className="post-rec mb-3">
                    <img className="center-block" alt="Card"
                         src={`https://drive.google.com/uc?export=view&id=${post.photoId}`}/>
                </div>
                <div className="text-center" onClick={() => window.scroll(0, 0)}>
                    <NavLink to={{pathname: `/redirect-to/post`, redirectPage: `/posts/post/${post.id}`}}>
                        {post.title}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

const RecommendedPosts = ({posts}) => {
    return (
        <div>
            <hr className="mt-3"/>
            <h2 className="mb-5">Вам может быть интересно</h2>

            {
                posts
                    ? <div>
                        <div className="row">
                            <Post post={posts[0]}/>
                            <Post post={posts[1]}/>
                            <Post post={posts[2]}/>
                        </div>
                    </div>
                    : <Spinner/>
            }

        </div>
    )
}

export default RecommendedPosts