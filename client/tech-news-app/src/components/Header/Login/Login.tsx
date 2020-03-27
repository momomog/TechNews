import React from 'react';
import {SECTION_ALL_POSTS} from "../../../common/Const";
import AuthButton from "./AuthButton/AuthButton";
import logo from '../../../static/logo.png'
import {NavLink} from "react-router-dom";
import {ChangeSectionAction, SetPostPageAction} from "../../../models/PostModel";
import AuthUser from "./AuthUser/AuthUser";
import {SetIsAuthAction, User} from "../../../models/UserModel";

interface Props {
    isAuth: boolean
    currentUserData: User
    setCurrentUserData: (userData: User) => void
    setIsAuth: (isAuth: boolean) => SetIsAuthAction
    changeSection: (sectionId: number) => ChangeSectionAction
    setPostPage: (pageNumber: number) => SetPostPageAction
    setPosts: (sectionId: number) => void
}

const Login: React.FC<Props> = ({isAuth, setPosts, changeSection, setPostPage, setCurrentUserData, setIsAuth, currentUserData}) => {
    const onLogoClick = () => {
        setPosts(SECTION_ALL_POSTS)
        setPostPage(1)
        changeSection(SECTION_ALL_POSTS)
    }

    return (
        <div className="container w-100">
            <div className="row logo-body ml-5">
                <div className="col-sm-6 d-flex align-content-center mt-2">
                    <NavLink to="/posts/all">
                        <img src={logo} alt="" width="60%" height="40%" onClick={onLogoClick}/>
                    </NavLink>
                </div>
                <div className="col-sm-6 d-flex align-items-end justify-content-end">
                    {
                        !isAuth && <AuthButton/>
                    }
                    {
                        isAuth && currentUserData.id &&
                        <AuthUser isAuth={isAuth}
                                  currentUserData={currentUserData}
                                  setCurrentUserData={setCurrentUserData}
                                  setIsAuth={setIsAuth}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login