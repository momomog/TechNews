import React from 'react';
import {Route} from "react-router-dom";

import PostsListWrapper from "./PostsList/PostsListWrapper";
import PostReviewWrapper from "./PostsReview/PostReviewWrapper";

function Content() {
    return (
        <div className="container container-body">
            <Route exact path="/" render={() => <PostsListWrapper/>}/>
            <Route exact path="/posts/:sectionName" render={() => <PostsListWrapper/>}/>
            <Route exact path="/posts/:sectionName/:page" render={() => <PostsListWrapper/>}/>
            <Route exact path='/posts/:sectionName/post/:postId' render={() => <PostReviewWrapper/>}/>
        </div>
    )
}

export default Content;