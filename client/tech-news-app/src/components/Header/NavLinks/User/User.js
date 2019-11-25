import React from 'react';
import {NavLink} from "react-router-dom";

function User(props) {

    function onLogout() {
        localStorage.removeItem('accessToken');
        props.setIsAuth(false);
        props.setUserData('');
    }


    return (
        <div className="dropdown">
            {
                props.isAuth
                    ? <div>
                        <button type="button" className="btn btn-primary-outline dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            {props.userData.firstName + ' ' + props.userData.lastName}
                        </button>
                        <div className="dropdown-menu">
                            <NavLink className="dropdown-item" to="/profile">Профиль</NavLink>
                            <NavLink className="dropdown-item" to="/profile">Another action</NavLink>
                            <NavLink className="dropdown-item" to="/profile">Something else here</NavLink>
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