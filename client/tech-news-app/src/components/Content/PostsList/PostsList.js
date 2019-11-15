import React from 'react';
import Post from "./Post/Post";
import PagesNavigation from "./PagesNavigation/PagesNavigation";

function PostsList(props) {
    return (
        <div>
            <div className="row">
                <PagesNavigation/>
            </div>
            {
                props.posts.map((post) => {
                    return <Post post={post}
                                 setCurrentPostId={props.setCurrentPostId}
                                 key={post.id}/>
                })
            }
            <div className="row">
                <PagesNavigation/>
            </div>
        </div>
    )
}

export default PostsList;