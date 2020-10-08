import React, {useContext} from 'react'
import {SECTION_ALL_POSTS} from '../../../common/Const'
import AuthButtons from './AuthButtons/AuthButtons'
import logo from '../../../static/logo.png'
import {NavLink} from 'react-router-dom'
import AuthUser from './AuthUser/AuthUser'
import {AppAuthContext, AuthContext} from '../../../context/AuthContext'
import {AppThemeContext, ThemeContext} from '../../../context/ThemeContext'
import {Dispatch} from 'redux'
import {useDispatch} from 'react-redux'
import {changeSection, getPosts, setPostPage} from '../../../redux/actions/postActions'

import lightIcon from '../../../static/day-theme.png'
import darkIcon from '../../../static/dark-theme.png'



/**
 * Верхний компонент шапки. Содержит лого и информацию об авторизованном юзере
 */
const Login: React.FC = () => {
    const {isAuth, user}: AppAuthContext = useContext(AuthContext)
    const dispatch: Dispatch = useDispatch()
    const {isLight, changeTheme}: AppThemeContext = useContext(ThemeContext)
    const changeThemeIcon: string = isLight ? lightIcon : darkIcon

    const onLogoClick = () => {
        dispatch(getPosts(SECTION_ALL_POSTS))
        dispatch(setPostPage())
        dispatch(changeSection(SECTION_ALL_POSTS))
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
                        && <AuthUser isAuth={isAuth}
                                     user={user}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login
