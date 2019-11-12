import React from 'react';
import Post from "./Post";

function PostsList(props) {
    return (
        <div>
            {
                props.posts.map((post) => {
                    return <Post post={post}  key={post.id}/>
                })
            }
        </div>
    )
}

export default PostsList;