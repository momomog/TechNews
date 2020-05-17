import React from 'react'
import {SECTION_ALL_POSTS} from '../../../common/Const'
import AuthButton from './AuthButton/AuthButton'
import logo from '../../../static/logo.png'
import {NavLink} from 'react-router-dom'
import {ChangeSectionAction, SetPostPageAction} from '../../../models/PostModel'
import AuthUser from './AuthUser/AuthUser'
import {SetIsAuthAction, User} from '../../../models/UserModel'

interface Props {
    isAuth: boolean
    userData: User
    setCurrentUserData: (userData: User) => void
    setIsAuth: (isAuth: boolean) => SetIsAuthAction
    changeSection: (sectionId: number) => ChangeSectionAction
    setPostPage: (pageNumber: number) => SetPostPageAction
    setPosts: (sectionId: number) => void
}

/**
 * Верхний компонент шапки. Содержит лого и информацию об авторизованном юзере
 * @param isAuth
 * @param setPosts
 * @param changeSection
 * @param setPostPage
 * @param setCurrentUserData
 * @param setIsAuth
 * @param userData
 */
const Login: React.FC<Props> = ({isAuth, setPosts, changeSection, setPostPage, setCurrentUserData, setIsAuth, userData}) => {
    const onLogoClick = () => {
        setPosts(SECTION_ALL_POSTS)
        setPostPage(1)
        changeSection(SECTION_ALL_POSTS)
    }

    return (
        <div className="container w-100">
            <div className="row logo-body ml-5">
                <div className="col-sm-6 d-flex align-content-end mt-2">
                    <NavLink to="/posts/all">
                        <img src={logo} alt="" width="60%" height="100%" onClick={onLogoClick}/>
                    </NavLink>
                </div>
                <div className="col-sm-6 d-flex align-items-end justify-content-end">
                    {
                        !isAuth && <AuthButton/>
                    }
                    {
                        isAuth && userData.id &&
                        <AuthUser isAuth={isAuth}
                                  userData={userData}
                                  setCurrentUserData={setCurrentUserData}
                                  setIsAuth={setIsAuth}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login