import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import App from './App'
import AuthService from '../common/AuthService'
import {getCurrentUserData, setIsAuth} from '../redux/actions/userActions'
import {AuthContext} from '../context/AuthContext'
import {Theme, useTheme} from '../hooks/useTheme'
import {ThemeContext} from '../context/ThemeContext'
import {connectToMsgWS, getWebService} from './pages/Messages/MessageWebService'
import {userDataSelector} from '../redux/selectors/selectors'
import {UserState} from '../models/UserModel'
import {Dispatch} from 'redux'


/**
 * Оболочка для корневого компонента
 */
const AppWrapper: React.FC = (): React.ReactElement => {
    const theme: Theme = useTheme(),
        dispatch: Dispatch = useDispatch(),
        {userData: user, isAuth}: UserState = useSelector(userDataSelector),
        authContext = {user, isAuth}

    useEffect(() => {
        if (AuthService.isAuth() && !isAuth) {
            dispatch(setIsAuth(true))
            dispatch(getCurrentUserData())
        }
        if (user.username && !getWebService())
            connectToMsgWS(user)
    }, [user.username, isAuth])

    return (
        <AuthContext.Provider value={authContext}>
            <ThemeContext.Provider value={theme}>
                <App/>
            </ThemeContext.Provider>
        </AuthContext.Provider>
    )
}

export default AppWrapper
