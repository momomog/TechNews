import React from 'react';
import {Route} from "react-router-dom";

import PostsListWrapper from "./PostsList/PostsListWrapper";
import PostReviewWrapper from "./PostsReview/PostReviewWrapper";
import AuthorizationWrapper from "../UserLogin/Authorization/AuthorizationWrapper";
import ProfileWrapper from "./Profile/ProfileWrapper";
import RegistrationWrapper from "../UserLogin/Registration/RegistrationWrapper";
import ProfileEditWrapper from "./ProfileEdit/ProfileEditWrapper";
import AdminPanel from "./AdminPanel/AdminPanel";

function Content() {
    return (
        <div className="container main-content">
            <Route exact path="/" render={() => <PostsListWrapper/>}/>
            <Route exact path={['/posts/:sectionName', '/posts/:sectionName/:page']} render={() => <PostsListWrapper/>}/>
            <Route exact path='/posts/:sectionName/post/:postId' render={() => <PostReviewWrapper/>}/>
            <Route exact path='/authorization' render={() => <AuthorizationWrapper/>}/>
            <Route exact path='/registration' render={() => <RegistrationWrapper/>}/>
            <Route exact path={['/profile', '/profile/:username']} render={() => <ProfileWrapper/>}/>
            <Route exact path='/profile/me/edit' render={() => <ProfileEditWrapper/>}/>
            <Route exact path='/admin-panel' render={() => <AdminPanel/>}/>
        </div>
    )
}

export default Content;