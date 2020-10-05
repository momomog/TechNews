import React from 'react'
import NavLinks from './NavLinks/NavLinks'
import Login from './Login/Login'
import {NotificationContainer} from 'react-notifications'
import {ChangeSectionAction, SetPostPageAction} from '../../models/PostModel'
import {SetIsAuthAction, User} from '../../models/UserModel'

interface Props {
    setPosts: (sectionId: number) => void
    changeSection: (sectionId: number) => ChangeSectionAction
    setPostPage: (pageNumber: number) => SetPostPageAction
    setCurrentUserData: (userData: User) => void
    setIsAuth: (isAuth: boolean) => SetIsAuthAction
}

/**
 * Шапка сайта
 */
const Header: React.FC<Props> = ({changeSection, setCurrentUserData, setIsAuth, setPostPage, setPosts}: Props) => {
    return (
        <div className="header-wrapper">

            <NotificationContainer/>

            <Login changeSection={changeSection}
                   setPosts={setPosts}
                   setPostPage={setPostPage}
                   setIsAuth={setIsAuth}
                   setCurrentUserData={setCurrentUserData}/>
            <NavLinks changeSection={changeSection}
                      setPosts={setPosts}
                      setPostPage={setPostPage}/>
        </div>
    )
}

export default Header
