import React from 'react';
import {NavLink} from "react-router-dom";

function User(props) {

    return (
        <div>
            <div className="btn-group">
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    Имя пользователя
                </button>
                <div className="dropdown-menu">
                    <NavLink className="dropdown-item" to="/profile">Профиль</NavLink>
                    <NavLink className="dropdown-item" to="/profile">Another action</NavLink>
                    <NavLink className="dropdown-item" to="/profile">Something else here</NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item" to="/logout">Выйти</NavLink>
                </div>
            </div>
        </div>
    )
}

export default User;