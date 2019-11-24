import React from 'react';
import {Route} from "react-router-dom";

import PostsListWrapper from "./PostsList/PostsListWrapper";
import PostReviewWrapper from "./PostsReview/PostReviewWrapper";
import AuthorizationWrapper from "../UserLogin/Authorization/AuthorizationWrapper";
import ProfileWrapper from "./Profile/ProfileWrapper";
import RegistrationWrapper from "../UserLogin/Registration/RegistrationWrapper";

function Content() {
    return (
        <div className="container">
            <Route exact path="/" render={() => <PostsListWrapper/>}/>
            <Route exact path="/posts/:sectionName" render={() => <PostsListWrapper/>}/>
            <Route exact path="/posts/:sectionName/:page" render={() => <PostsListWrapper/>}/>
            <Route exact path='/posts/:sectionName/post/:postId' render={() => <PostReviewWrapper/>}/>
            <Route exact path='/authorization' render={() => <AuthorizationWrapper/>}/>
            <Route exact path='/registration' render={() => <RegistrationWrapper/>}/>
            <Route exact path='/profile' render={() => <ProfileWrapper/>}/>
        </div>
    )
}

export default Content;