import React from 'react';
import {Route} from "react-router-dom";

import PostReview from "./PostsReview/PostReview";
import PostsListWrapper from "./PostsList/PostsListWrapper";

function Content(props) {
    return (
        <div className="container container-body">
            <Route exact path="/" render={() => <PostsListWrapper/>}/>
            <Route path="/all" render={() => <PostsListWrapper/>}/>
            <Route path='/post' render={() => <PostReview/>}/>
            {/*<Route path='/post/:postId' render={() => <PostReviewContainer/>}/>*/}
        </div>
    )
}

export default Content;