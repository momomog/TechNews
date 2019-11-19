import React from 'react';
import {Route} from "react-router-dom";

import PostsListWrapper from "./PostsList/PostsListWrapper";
import PostReviewWrapper from "./PostsReview/PostReviewWrapper";
import Authorization from "../UserLogin/Authorization/Authorization";
import Registration from "../UserLogin/Registration/Registration";

function Content() {
    return (
        <div className="container">
            <Route exact path="/" render={() => <PostsListWrapper/>}/>
            <Route exact path="/posts/:sectionName" render={() => <PostsListWrapper/>}/>
            <Route exact path="/posts/:sectionName/:page" render={() => <PostsListWrapper/>}/>
            <Route exact path='/posts/:sectionName/post/:postId' render={() => <PostReviewWrapper/>}/>
            <Route exact path='/authorization' render={() => <Authorization/>}/>
            <Route exact path='/registration' render={() => <Registration/>}/>
        </div>
    )
}

export default Content;