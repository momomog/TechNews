import React, {useContext} from 'react'
import {SECTION_ALL_POSTS} from '../../../common/Const'
import AuthButtons from './AuthButtons/AuthButtons'
import logo from '../../../static/logo.png'
import {NavLink} from 'react-router-dom'
import {ChangeSectionAction, SetPostPageAction} from '../../../models/PostModel'
import AuthUser from './AuthUser/AuthUser'
import {SetIsAuthAction, User} from '../../../models/UserModel'
import {AppAuthContext, AuthContext} from '../../../context/AuthContext'
import {AppThemeContext, ThemeContext} from '../../../context/ThemeContext'

import lightIcon from '../../../static/day-theme.png'
import darkIcon from '../../../static/dark-theme.png'

interface Props {
    setCurrentUserData: (userData: User) => void
    setIsAuth: (isAuth: boolean) => SetIsAuthAction
    changeSection: (sectionId: number) => ChangeSectionAction
    setPostPage: (pageNumber: number) => SetPostPageAction
    setPosts: (sectionId: number) => void
}

/**
 * Верхний компонент шапки. Содержит лого и информацию об авторизованном юзере
 */
const Login: React.FC<Props> = ({setPosts, changeSection, setPostPage, setCurrentUserData, setIsAuth}: Props) => {
    const {isAuth, user}: AppAuthContext = useContext(AuthContext)
    const {isLight, changeTheme}: AppThemeContext = useContext(ThemeContext)
    const changeThemeIcon: string = isLight ? lightIcon : darkIcon

    const onLogoClick = () => {
        setPosts(SECTION_ALL_POSTS)
        setPostPage(1)
        changeSection(SECTION_ALL_POSTS)
    }

    return (
        <div className="container">
            <div className="row logo-body">
                <div className="col-sm-12 d-flex justify-content-between align-items-end">
                    <NavLink to="/posts/all">
                        <img src={logo}
                             className="site-logo"
                             alt="site-logo"
                             onClick={onLogoClick}/>
                    </NavLink>
                    <img src={changeThemeIcon}
                         className="change-theme-icon" alt="themeIcon"
                         onClick={changeTheme}/>
                    {
                        !isAuth && <AuthButtons/>
                    }
                    {
                        isAuth && user.id > 0
                        && <AuthUser setCurrentUserData={setCurrentUserData}
                                     setIsAuth={setIsAuth}
                                     isAuth={isAuth}
                                     user={user}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login
