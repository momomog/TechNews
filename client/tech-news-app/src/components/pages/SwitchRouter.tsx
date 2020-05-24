import React, {useContext, useEffect, useState} from 'react'
import {Switch} from 'react-router-dom'
import {AuthContext} from '../../context/authContext/AuthContext'
import {getRoutes} from './routes'

/**
 * Главный роутер приложения
 */
const SwitchRouter = () => {
    const [isUserAuth, setIsUserAuth] = useState(false)
    const {isAuth} = useContext(AuthContext)

    useEffect(() => setIsUserAuth(isAuth), [setIsUserAuth, isAuth])

    return (
        <div className="container main-content">
            <Switch>
                {
                    getRoutes(isUserAuth)
                }
            </Switch>
        </div>
    )
}

export default SwitchRouter