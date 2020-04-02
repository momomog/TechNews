import React from 'react';
import {NavLink} from "react-router-dom";
import AuthService from "../../../../common/AuthService";
import {SetIsAuthAction, User, UserInitial} from "../../../../models/UserModel";

interface Props {
    isAuth: boolean
    userData: User
    setCurrentUserData: (userData: User) => void
    setIsAuth: (isAuth: boolean) => SetIsAuthAction
}

/**
 *
 * @param isAuth
 * @param userData
 * @param setIsAuth
 * @param setCurrentUserData
 * Авторизованный пользователь
 */
const AuthUser: React.FC<Props> = ({isAuth, userData, setIsAuth, setCurrentUserData}) => {

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
                        {userData.firstName}&nbsp;
                        <img src={userData.profileData.photoId
                        && `https://drive.google.com/uc?export=view&id=${userData.profileData.photoId}`}/>
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
                                <NavLink className="dropdown-item" to="/posts/all">
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