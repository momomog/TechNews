import React from 'react'
import {Route, Switch} from 'react-router-dom'

import PostsListWrapper from './PostsList/PostsListWrapper'
import PostReviewWrapper from './PostsReview/PostReviewWrapper'
import AuthorizationWrapper from './autentification/Authorization/AuthorizationWrapper'
import ProfileEditWrapper from './editPages/ProfileEdit/ProfileEditWrapper'
import PostEditWrapper from './editPages/PostEdit/PostEditWrapper'
import AdminPanelWrapper from './AdminPanel/AdminPanelWrapper'
import NewPostPageWrapper from './editPages/NewPostPage/NewPostPageWrapper'
import {NotFoundComponent} from '../core/NotFoundComponent'
import {RedirectComponentWrapper} from '../core/RedirectComponent'
import RegistrationWrapper from './autentification/Registration/RegistrationWrapper'
import ProfileWrapper from './Profile/ProfileWrapper'
import PostSearchWrapper from './PostSearch/PostSearchWrapper'

/**
 * Главный роутер приложения
 */
const SwitchRouter = () => {
    return (
        <div className="container main-content">
            <Switch>
                <Route exact path='/posts/post/:postId' component={PostReviewWrapper}/>
                <Route exact path='/posts/search' component={PostSearchWrapper}/>
                <Route exact path={['/', '/posts/:sectionName', '/posts/:sectionName/:page']}
                       component={PostsListWrapper}/>
                <Route path='/new-post' component={NewPostPageWrapper}/>


                <Route path='/registration' component={RegistrationWrapper}/>
                <Route path='/authorization' component={AuthorizationWrapper}/>
                <Route path='/admin-panel' component={AdminPanelWrapper}/>


                <Route exact path={['/profile', '/profile/:username']} component={ProfileWrapper}/>
                <Route exact path='/profile/me/edit' component={ProfileEditWrapper}/>
                <Route exact path='/posts/post/:postId/edit' component={PostEditWrapper}/>


                <Route exact path='/redirect-to/:pageName' component={RedirectComponentWrapper}/>
                <Route path={['/error/:code', '*']} component={NotFoundComponent}/>
            </Switch>
        </div>
    )
}

export default SwitchRouter