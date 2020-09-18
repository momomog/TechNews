import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import App from './App'
import AuthService from '../common/AuthService'
import {getCurrentUserData, setIsAuthAction} from '../redux/actions/userActions'
import {AuthContext} from '../context/AuthContext'
import {useTheme} from '../hooks/useTheme'
import {ThemeContext} from '../context/ThemeContext'
import {connectToMsgWS, getWebService} from './pages/Messages/MessageWebService'
import {Message} from '../models/MessageModel'
import {addDialogMessage, getDialogUsers, setDialogUsersData, setWritingUsers} from "../redux/actions/messageActions";
import {userDataSelector} from "../redux/selectors/selectors";


/**
 * Оболочка для корневого компонента
 */
const AppWrapper: React.FC = () => {
    const theme = useTheme(),
        dispatch = useDispatch(),
        {userData: user, isAuth} = useSelector(userDataSelector)

    const addDialogMsg = (message: Message) => dispatch(addDialogMessage(message))
    const setWritingUsersList = (payload: Message) => dispatch(setWritingUsers(payload))
    const setDialogUsersInfo = (payload: Message, userId: number) => dispatch(setDialogUsersData(payload, userId))
    const getDialogUsersList = () => dispatch(getDialogUsers())

    useEffect(() => {
        if (AuthService.isAuth() && !isAuth) {
            dispatch(setIsAuthAction(true))
            dispatch(getCurrentUserData())
        }
        if (user.username && !getWebService())
            connectToMsgWS(user, addDialogMsg, setWritingUsersList, getDialogUsersList, setDialogUsersInfo)
    }, [user.username, isAuth])

    return (
        <AuthContext.Provider value={{isAuth, user}}>
            <ThemeContext.Provider value={theme}>
                <App/>
            </ThemeContext.Provider>
        </AuthContext.Provider>
    )
}

export default AppWrapper