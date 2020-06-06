import React from 'react'
import {NavLink} from 'react-router-dom'
import {isMobile} from 'react-device-detect'

/**
 * Кнопки регистрации/авторизации пользователя
 */
const AuthButtons = () => {
    return isMobile
        ? <div className="d-flex">
            <NavLink to="/registration">
                <i className="sign-up-icon mr-2" title="Регистрация"/>
            </NavLink>
            <NavLink to="/authorization">
                <i className="sign-in-icon" title="Вход"/>
            </NavLink>
        </div>
        : <div>
            <NavLink className="btn btn-info mt-1 auth-button" to="/registration">
                Регистрация
            </NavLink>
            <NavLink className="btn btn-info mr-2 mt-1 auth-button" to="/authorization">
                Войти
            </NavLink>
        </div>

}

export default AuthButtons