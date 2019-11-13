import React from 'react';
import Post from "./Post/Post";

function PostsList(props) {
    return (
        <div>
            {
                props.posts.map((post) => {
                    return <Post post={post}
                                 setCurrentPostId={props.setCurrentPostId}
                                 key={post.id}/>
                })
            }
        </div>
    )
}

export default PostsList;