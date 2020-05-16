import React from 'react';
import {Route, Switch} from "react-router-dom";

import PostsListWrapper from "./PostsList/PostsListWrapper";
import PostReviewWrapper from "./PostsReview/PostReviewWrapper";
import AuthorizationWrapper from "./Autentification/Authorization/AuthorizationWrapper";
import ProfileEditWrapper from "./EditPages/ProfileEdit/ProfileEditWrapper";
import PostEditWrapper from "./EditPages/PostEdit/PostEditWrapper";
import AdminPanelWrapper from "./AdminPanel/AdminPanelWrapper";
import NewPostPageWrapper from "./EditPages/NewPostPage/NewPostPageWrapper";
import {NotFoundComponent} from "../core/NotFoundComponent";
import {RedirectComponentWrapper} from "../core/RedirectComponent";
import RegistrationWrapper from "./Autentification/Registration/RegistrationWrapper";
import ProfileWrapper from "./Profile/ProfileWrapper";
import PostSearchWrapper from "./PostSearch/PostSearchWrapper";

/**
 *
 * Главный роутер приложения
 */
const SwitchRouter = () => {
    return (
        <div className="container main-content">
            <Switch>
                <Route exact path='/posts/post/:postId' render={() => <PostReviewWrapper/>}/>
                <Route exact path='/posts/search' render={() => <PostSearchWrapper/>}/>
                <Route exact path={['/', '/posts/:sectionName', '/posts/:sectionName/:page']}
                       render={() => <PostsListWrapper/>}/>
                <Route exact path='/new-post' render={() => <NewPostPageWrapper/>}/>


                <Route exact path='/registration' render={() => <RegistrationWrapper/>}/>
                <Route exact path='/authorization' render={() => <AuthorizationWrapper/>}/>
                <Route exact path='/admin-panel' render={() => <AdminPanelWrapper/>}/>


                <Route exact path={['/profile', '/profile/:username']} render={() => <ProfileWrapper/>}/>
                <Route exact path='/profile/me/edit' render={() => <ProfileEditWrapper/>}/>
                <Route exact path='/posts/post/:postId/edit' render={() => <PostEditWrapper/>}/>


                <Route exact path='/redirect-to/:pageName' render={() => <RedirectComponentWrapper/>}/>
                <Route path={['/error/:code', '*']} render={() => <NotFoundComponent/>}/>
            </Switch>
        </div>
    )
}

export default SwitchRouter