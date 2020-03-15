import React from 'react';
import {NavLink} from "react-router-dom";

function AuthButton() {
    return (
        <div>
            <NavLink className="btn btn-info pull-right ml-3"
                     to="/authorization">
                Войти
            </NavLink>
            <NavLink className="btn btn-info pull-right ml-5"
                     to="/registration">
                Регистрация
            </NavLink>
        </div>
    )
}

export default AuthButton