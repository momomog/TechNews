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
import RegistrationWrapper from './autentification/Registration/RegistrationWrapper'
import AuthorizationWrapper from './autentification/Authorization/AuthorizationWrapper'
import {RedirectComponentWrapper} from '../core/RedirectComponent'
import {NotFoundComponent} from '../core/NotFoundComponent'

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
}]

 /**
 * Роуты авторизованного пользователя
 */
const authRoutes = [{
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
   const routes = isAuth
        // @ts-ignore
        ? baseRoutes.concat(authRoutes, postfixRoutes)
        // @ts-ignore
        : baseRoutes.concat(guestRoutes, postfixRoutes)

    return routes.map(route => <Route key={route.path.toString()}
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
//
//
// export const getRoutes = (isAuth: boolean) => {
//     return (
//         <>
//             {
//                 baseRoutes()
//             }
//             {
//                 isAuth ? authRoutes() : guestRoutes()
//             }
//             {
//                 postfixRoutes()
//             }
//         </>
//     )
// }