import React, {useContext, useMemo} from 'react'
import {Route, Switch} from 'react-router-dom'
import {AppAuthContext, AuthContext} from '../../context/AuthContext'
import {getRoutes} from './routes'

/**
 * Главный роутер приложения
 */
const SwitchRouter = () => {
    const {isAuth}: AppAuthContext = useContext(AuthContext)
    const routes: Array<Route> = useMemo(() => getRoutes(isAuth), [isAuth])

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