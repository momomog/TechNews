import React from 'react';
import Post from "./Post/Post";
import PagesNavigationWrapper from "./PagesNavigation/PagesNavigationWrapper";

function PostsList(props) {

    return (
        <div>
            <div className="row">
                <PagesNavigationWrapper/>
            </div>

            {
                props.posts.map((post) => {
                    return <Post post={post}
                                 setPostId={props.setPostId}
                                 sectionId={props.sectionId}
                                 key={post.id}/>
                })
            }

            <div className="row">
                <PagesNavigationWrapper/>
            </div>
        </div>
    )
}

export default PostsList;