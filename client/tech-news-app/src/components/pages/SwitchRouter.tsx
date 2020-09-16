import React, {useContext, useMemo} from 'react'
import {Switch} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import {getRoutes} from './routes'

/**
 * Главный роутер приложения
 */
const SwitchRouter = () => {
    const {isAuth} = useContext(AuthContext)
    const routes = useMemo(() => getRoutes(isAuth), [isAuth])

    return (
        <div className="container main-content">
            <Switch>
                {
                    routes
                }
            </Switch>
        </div>
    )
}

export default SwitchRouter