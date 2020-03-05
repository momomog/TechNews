import React from 'react';
import {Route} from "react-router-dom";

import PostsListWrapper from "./PostsList/PostsListWrapper";
import PostReviewWrapper from "./PostsReview/PostReviewWrapper";
import AuthorizationWrapper from "../Autentification/Authorization/AuthorizationWrapper";
import ProfileWrapper from "./Profile/ProfileWrapper";
import RegistrationWrapper from "../Autentification/Registration/RegistrationWrapper";
import ProfileEditWrapper from "./EditPages/ProfileEdit/ProfileEditWrapper";
import PostEditWrapper from "./EditPages/PostEdit/PostEditWrapper";
import AdminPanelWrapper from "./AdminPanel/AdminPanelWrapper";
import NewPostPageWrapper from "./EditPages/NewPostPage/NewPostPageWrapper";

function Content() {
    return (
        <div className="container main-content">
             {/*posts*/}
            <Route exact path={[
                '/',
                '/posts/:sectionName',
                '/posts/:sectionName/:page'
            ]} render={() => <PostsListWrapper/>}/>
            <Route exact path='/posts/:sectionName/post/:postId' render={() => <PostReviewWrapper/>}/>
            <Route exact path='/new-post' render={() => <NewPostPageWrapper/>}/>


             {/*authentication*/}
            <Route exact path='/registration' render={() => <RegistrationWrapper/>}/>
            <Route exact path='/authorization' render={() => <AuthorizationWrapper/>}/>
            <Route exact path='/admin-panel' render={() => <AdminPanelWrapper/>}/>

             {/*profile*/}
            <Route exact path={[
                '/profile',
                '/profile/:username'
            ]} render={() => <ProfileWrapper/>}/>
            <Route exact path='/profile/me/edit' render={() => <ProfileEditWrapper/>}/>
            <Route exact path='/posts/:sectionName/post/:postId/edit' render={() => <PostEditWrapper/>}/>
        </div>
    )
}

export default Content;