import React from 'react';
import {NavLink} from "react-router-dom";
import AuthService from "../../../../common/AuthService";
import {SetIsAuthAction, User, UserInitial} from "../../../../models/UserModel";

interface Props {
    isAuth: boolean
    currentUserData: User
    setCurrentUserData: (userData: User) => any
    setIsAuth: (isAuth: boolean) => SetIsAuthAction
}

const AuthUser: React.FC<Props> = ({isAuth, currentUserData, setIsAuth, setCurrentUserData}) => {

    const onLogout = () => {
        AuthService.removeToken()
        setIsAuth(false)
        setCurrentUserData(UserInitial)
    }

    return (
        <div className="dropdown">
            {
                isAuth
                && <div>
                    <button className="btn btn-primary-outline dropdown-toggle user-action-button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        {currentUserData.firstName} <img
                        src={currentUserData.profileData.photoId && `https://drive.google.com/uc?export=view&id=${currentUserData.profileData.photoId}`}
                        alt=""/>
                    </button>
                    <div className="dropdown-menu">
                        <NavLink className="dropdown-item" to="/profile">Профиль</NavLink>
                        <NavLink className="dropdown-item" to="/profile/me/edit">Редактировать</NavLink>
                        <div className="dropdown-divider"/>

                        {
                            AuthService.isAdmin()
                            && <span>
                                  <NavLink className="dropdown-item"
                                           to="/admin-panel">
                                      Панель администрирования
                                  </NavLink>
                                  <div className="dropdown-divider"/>
                                </span>
                        }

                        <span onClick={onLogout}>
                                <NavLink className="dropdown-item"
                                         to="/posts/all">
                                    Выйти
                                </NavLink>
                            </span>
                    </div>
                </div>
            }
        </div>
    )
}

export default AuthUser