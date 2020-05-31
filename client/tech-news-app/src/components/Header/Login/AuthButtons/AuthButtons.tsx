import React from 'react'
import {NavLink} from 'react-router-dom'

/**
 * Кнопки регистрации/авторизации пользователя
 */
const AuthButtons = () => {
    return (
        <div>
            <span>
               <NavLink className="btn btn-info" to="/registration">
                    Регистрация
               </NavLink>
            </span>
            <span className="ml-2">
                <NavLink className="btn btn-info" to="/authorization">
                    Войти
               </NavLink>
            </span>
        </div>
    )
}

export default AuthButtons