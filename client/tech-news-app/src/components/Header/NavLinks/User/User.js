import React from 'react';
import {NavLink} from "react-router-dom";
import AuthService from "../../../../common/AuthService";

function User(props) {

    function onLogout() {
        AuthService.removeToken();
        props.setIsAuth(false);
        props.setCurrentUserData(null);
    }

    return (
        <div className="dropdown">
            {
                props.isAuth && props.currentUserData
                && <div>
                    <button className="btn btn-primary-outline dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        {`${props.currentUserData.firstName} ${props.currentUserData.lastName}`}
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

export default User;