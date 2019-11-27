import React from 'react';
import {NavLink} from "react-router-dom";

class AuthButton extends React.Component {

    render() {
        return (
            <div>
                <NavLink className="btn btn-info pull-right sing-in-button" to="/authorization">
                    Войти
                </NavLink>
                <NavLink className="btn btn-info pull-right" to="/registration">
                    Регистрация
                </NavLink>
            </div>
        )
    }
}

export default AuthButton;