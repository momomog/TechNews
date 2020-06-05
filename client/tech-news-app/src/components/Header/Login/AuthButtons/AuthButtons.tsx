import React from 'react'
import {NavLink} from 'react-router-dom'

/**
 * Кнопки регистрации/авторизации пользователя
 */
const AuthButtons = () => {
    return (
        <>
            <NavLink className="btn btn-info" to="/registration">
                Регистрация
            </NavLink>
            <NavLink className="btn btn-info ml-2" to="/authorization">
                Войти
            </NavLink>
        </>
    )
}

export default AuthButtons