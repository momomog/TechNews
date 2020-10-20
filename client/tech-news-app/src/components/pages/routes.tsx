import {Route} from 'react-router-dom'
import React, {lazy} from 'react'

const PostReviewWrapper = lazy(() => import('./PostsReview/PostReviewWrapper'))
const PostSearchWrapper = lazy(() => import('./PostSearch/PostSearchWrapper'))
const PostsListWrapper = lazy(() => import('./PostsList/PostsListWrapper'))
const NewPostPageWrapper = lazy(() => import('./PostsReview/PostReviewWrapper'))
const AdminPanelWrapper = lazy(() => import('./AdminPanel/AdminPanelWrapper'))
const ProfileWrapper = lazy(() => import('./Profile/ProfileWrapper'))
const ProfileEditWrapper = lazy(() => import('./editPages/ProfileEdit/ProfileEditWrapper'))
const PostEditWrapper = lazy(() => import('./editPages/PostEdit/PostEditWrapper'))
const RedirectComponentWrapper = lazy(() => import('../core/RedirectComponent'))
const MessagesWrapper = lazy(() => import('./Messages/MessagesWrapper'))
const History = lazy(() => import('../Footer/info/History'))
const Technologies = lazy(() => import('../Footer/info/Technologies'))
const ProjectStructure = lazy(() => import('../Footer/info/ProjectStructure'))
const RegistrationWrapper = lazy(() => import('./authentication/Registration/RegistrationWrapper'))
const AuthorizationWrapper = lazy(() => import('./authentication/Authorization/AuthorizationWrapper'))
const NotFoundComponent = lazy(() => import('../core/NotFoundComponent'))

type RouteProp = {
    path: string | Array<string>
    component: React.FC | React.FC<SpecificRedirectCompProps>
    exact: boolean
}

// TODO избавиться
interface SpecificRedirectCompProps {
    location: {
        redirectUrl: string
    }
}

/**
 * Базовые роуты приложения независимо от авторизованности пользователя
 */
const baseRoutes: Array<RouteProp> = [{
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
const authRoutes: Array<RouteProp> = [{
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
const guestRoutes: Array<RouteProp> = [{
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
const postfixRoutes: Array<RouteProp> = [{
    path: '/redirect-to/:pageName',
    component: RedirectComponentWrapper,
    exact: true
}, {
    path: ['/error/:code', '*'],
    component: NotFoundComponent,
    exact: true
}]

export const getRoutes = (isAuth: boolean) => {
    const routes: Array<RouteProp> = baseRoutes.concat(isAuth ? authRoutes : guestRoutes, postfixRoutes)

    return routes.map((route: RouteProp) => <Route key={typeof route.path === 'string' ? route.path : route.path[0]}
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
