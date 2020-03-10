import React from 'react';
import {NavLink} from "react-router-dom";
import AuthService from "../../../../common/AuthService";

class User extends React.Component {

    onLogout = () => {
        AuthService.removeToken();
        this.props.setIsAuth(false);
        this.props.setCurrentUserData('');
    };

    render() {
        return (
            <div className="dropdown">
                {
                    this.props.isAuth
                    && <div>
                        <button className="btn btn-primary-outline dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                            {`${this.props.currentUserData.firstName} ${this.props.currentUserData.lastName}`}
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

                            <span onClick={this.onLogout}>
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


}

export default User;