import React from 'react';
import {Route} from "react-router-dom";

import PostsList from "./PostsList/PostsList";
import PostReview from "./PostsReview/PostReview";

function Content(props) {
    return (
        <div className="container">
            <Route exact path="/" render={() => <PostsList posts={props.posts}/>}/>
            <Route path="/all" render={() => <PostsList posts={props.posts}/>}/>
            <Route path='/post' render={() => <PostReview/>}/>
            {/*<Route path='/post/:postId' render={() => <PostReviewContainer/>}/>*/}
        </div>
    )
}

export default Content;