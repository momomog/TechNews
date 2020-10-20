import React, {useContext, useMemo, Suspense} from 'react'
import {Switch} from 'react-router-dom'
import {AppAuthContext, AuthContext} from '../../context/AuthContext'
import {getRoutes} from './routes'
import Spinner from '../core/Spinner'

/**
 * Главный роутер приложения
 */
const SwitchRouter = () => {
    const {isAuth}: AppAuthContext = useContext(AuthContext)
    const routes = useMemo(() => getRoutes(isAuth), [isAuth])

    return (
        <div className="container main-content">
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    {
                        routes
                    }
                </Switch>
            </Suspense>
        </div>
    )
}

export default SwitchRouter
