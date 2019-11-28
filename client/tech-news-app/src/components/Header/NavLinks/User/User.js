import React from 'react';
import {NavLink} from "react-router-dom";
import Common from "../../../../common/Common";

function User(props) {

    function onLogout() {
        Common.removeToken();
        props.setIsAuth(false);
        props.setCurrentUserData('');
    }


    return (
        <div className="dropdown">
            {
                props.isAuth
                    ? <div>
                        <button type="button" className="btn btn-primary-outline dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            {props.currentUserData.firstName + ' ' + props.currentUserData.lastName}
                        </button>
                        <div className="dropdown-menu">
                            <NavLink className="dropdown-item" to="/profile">Профиль</NavLink>
                            <NavLink className="dropdown-item" to="/profile/edit">Редактировать</NavLink>
                            <div className="dropdown-divider"/>
                            <span onClick={onLogout}>
                                <NavLink className="dropdown-item" to="/posts/all">Выйти</NavLink>
                            </span>
                        </div>
                      </div>
                    : ''
            }
        </div>
    )
}

export default User;