import {Route} from 'react-router-dom'
import React from 'react'
import PostReviewWrapper from './PostsReview/PostReviewWrapper'
import PostSearchWrapper from './PostSearch/PostSearchWrapper'
import PostsListWrapper from './PostsList/PostsListWrapper'
import NewPostPageWrapper from './editPages/NewPostPage/NewPostPageWrapper'
import AdminPanelWrapper from './AdminPanel/AdminPanelWrapper'
import ProfileWrapper from './Profile/ProfileWrapper'
import ProfileEditWrapper from './editPages/ProfileEdit/ProfileEditWrapper'
import PostEditWrapper from './editPages/PostEdit/PostEditWrapper'
import {RedirectComponentWrapper} from '../core/RedirectComponent'
import {NotFoundComponent} from '../core/NotFoundComponent'
import MessagesWrapper from './Messages/MessagesWrapper'
import History from '../Footer/info/History'
import Technologies from '../Footer/info/Technologies'
import ProjectStructure from '../Footer/info/ProjectStructure'
import RegistrationWrapper from './authentication/Registration/RegistrationWrapper'
import AuthorizationWrapper from './authentication/Authorization/AuthorizationWrapper'

/**
 * Базовые роуты приложения независимо от авторизованности пользователя
 */
const baseRoutes = [{
    path: '/posts/post/:postId',
    component: PostReviewWrapper,
    exact: true
}, {
    path: '/posts/search',
    component: PostSearchWrapper,
    exact: true
}, {
    path: ['/', '/posts/:sectionName', '/posts/:sectionName/:page'],
    component: PostsListWrapper,
    exact: true
}, {
    path: '/profile/:username',
    component: ProfileWrapper,
    exact: true
}, {
    path: '/history',
    component: History,
    exact: false
}, {
    path: '/technologies',
    component: Technologies,
    exact: false
}, {
    path: '/project-struct',
    component: ProjectStructure,
    exact: false
}]

/**
 * Роуты авторизованного пользователя
 */
const authRoutes = [{
    path: '/messages',
    component: MessagesWrapper,
    exact: false
}, {
    path: '/new-post',
    component: NewPostPageWrapper,
    exact: false
}, {
    path: '/admin-panel',
    component: AdminPanelWrapper,
    exact: false
}, {
    path: '/profile',
    component: ProfileWrapper,
    exact: true
}, {
    path: '/profile/me/edit',
    component: ProfileEditWrapper,
    exact: true
}, {
    path: '/posts/post/:postId/edit',
    component: PostEditWrapper,
    exact: true
}]

/**
 * Роуты гостевого пользователя
 */
const guestRoutes = [{
    path: '/registration',
    component: RegistrationWrapper,
    exact: false
}, {
    path: '/authorization',
    component: AuthorizationWrapper,
    exact: false
}]

/**
 * Роуты обработки ошибок
 */
const postfixRoutes = [{
    path: '/redirect-to/:pageName',
    component: RedirectComponentWrapper,
    exact: true
}, {
    path: ['/error/:code', '*'],
    component: NotFoundComponent,
    exact: false
}]

export const getRoutes = (isAuth: boolean) => {
    // @ts-ignore
    const routes = baseRoutes.concat(isAuth ? authRoutes : guestRoutes, postfixRoutes)

    return routes.map(route => <Route key={route.path}
                                      path={route.path}
                                      exact={route.exact}
                                      component={route.component}/>
    )
}


// const baseRoutes = () => <>
//     <Route exact path='/posts/post/:postId' component={PostReviewWrapper}/>
//
//     <Route exact path='/posts/search' component={PostSearchWrapper}/>
//     <Route exact path={['/', '/posts/:sectionName', '/posts/:sectionName/:page']}
//            component={PostsListWrapper}/>
// </>
//
// const authRoutes = () => <>
//     <Route path='/new-post' component={NewPostPageWrapper}/>
//     <Route path='/admin-panel' component={AdminPanelWrapper}/>
//     <Route exact path={['/profile', '/profile/:username']} component={ProfileWrapper}/>
//     <Route exact path='/profile/me/edit' component={ProfileEditWrapper}/>
//     <Route exact path='/posts/post/:postId/edit' component={PostEditWrapper}/>
// </>
//
// const guestRoutes = () => <>
//     <Route path='/registration' component={RegistrationWrapper}/>
//     <Route path='/authorization' component={AuthorizationWrapper}/>
// </>
//
// const postfixRoutes = () => <>
//     <Route exact path='/redirect-to/:pageName' component={RedirectComponentWrapper}/>
//     <Route path={['/error/:code', '*']} component={NotFoundComponent}/>
// </>