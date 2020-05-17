import React from 'react'
import NavLinks from './NavLinks/NavLinks'
import Login from './Login/Login'
import {NotificationContainer} from 'react-notifications'
import {ChangeSectionAction, SetPostPageAction} from '../../models/PostModel'
import {SetIsAuthAction, User} from '../../models/UserModel'

interface Props {
    isAuth: boolean
    userData: User
    setPosts: (sectionId: number) => void
    changeSection: (sectionId: number) => ChangeSectionAction
    setPostPage: (pageNumber: number) => SetPostPageAction
    setCurrentUserData: (userData: User) => void
    setIsAuth: (isAuth: boolean) => SetIsAuthAction
}

/**
 * Шапка сайта
 * @param props
 */
const Header: React.FC<Props> = props => {
    return (
        <div className="header-wrapper">

            <NotificationContainer/>

            <Login changeSection={props.changeSection}
                   userData={props.userData}
                   setPosts={props.setPosts}
                   setPostPage={props.setPostPage}
                   setIsAuth={props.setIsAuth}
                   setCurrentUserData={props.setCurrentUserData}
                   isAuth={props.isAuth}/>
            <NavLinks changeSection={props.changeSection}
                      setPosts={props.setPosts}
                      setPostPage={props.setPostPage}/>
        </div>
    )
}

export default Header