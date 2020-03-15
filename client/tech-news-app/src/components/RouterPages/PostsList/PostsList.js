import React from 'react';
import Post from "./Post/Post";
import PagesNavigationWrapper from "./PagesNavigation/PagesNavigationWrapper";

function PostsList(props) {

    return (
        <div>
            <PagesNavigationWrapper/>

            {
                props.posts.map(post => {
                    return <Post post={post}
                                 setPostId={props.setPostId}
                                 key={post.id}/>
                })
            }

            <PagesNavigationWrapper/>
        </div>
    )
}

export default PostsList;