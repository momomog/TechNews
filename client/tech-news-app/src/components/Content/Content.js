import React from 'react';
import {Route} from "react-router-dom";

import PostsListWrapper from "./PostsList/PostsListWrapper";
import PostReviewWrapper from "./PostsReview/PostReviewWrapper";

function Content(props) {
    return (
        <div className="container container-body">
            <Route exact path="/" render={() => <PostsListWrapper/>}/>
            <Route path="/all" render={() => <PostsListWrapper/>}/>
            <Route path='/post' render={() => <PostReviewWrapper/>}/>
            {/*<Route path='/post/:postId' render={() => <PostReviewContainer/>}/>*/}
        </div>
    )
}

export default Content;