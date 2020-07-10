import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import App from './App'
import AuthService from '../common/AuthService'
import {Dispatch} from 'redux'
import {User, UserAction} from '../models/UserModel'
import {getCurrentUserData, setIsAuthAction} from '../redux/actions/userActions'
import {RootState} from '../redux/reducers/rootReducer'
import {AuthContext} from '../context/AuthContext'
import {useTheme} from '../hooks/useTheme'
import {ThemeContext} from '../context/ThemeContext'
import {connectToMsgWS, getWebService} from './pages/Messages/MessageWebService'
import {Message} from '../models/MessageModel'
import {addDialogMessage, getDialogUsers, setDialogUsersData, setWritingUsers} from '../redux/actions/messageActions'

interface Props {
    isAuth: boolean
    user: User
    setIsAuth: (isAuth: boolean) => UserAction,
    getUserData: () => void
    addDialogMessage: (message: Message) => void
    setWritingUsers: (payload: Message) => void
    setDialogUsersData: (payload: Message, userId: number) => void
    getDialogUsers: () => void
}

/**
 * Оболочка для корневого компонента
 * @param isAuth
 * @param user
 * @param setIsAuth
 * @param getUserData
 * @param getDialogUsers
 * @param addDialogMessage
 * @param setWritingUsers
 * @param setDialogUsersData
 */
const AppWrapper: React.FC<Props> = ({setIsAuth, getUserData, isAuth, user, getDialogUsers, addDialogMessage, setWritingUsers, setDialogUsersData}) => {
    const theme = useTheme()

    useEffect(() => {
        if (AuthService.isAuth() && !isAuth) {
            setIsAuth(true)
            getUserData()
        }
        if (user.username && !getWebService())
            connectToMsgWS(user, addDialogMessage, setWritingUsers, getDialogUsers, setDialogUsersData)
    }, [setIsAuth, getUserData, user.username, isAuth])

    return (
        <AuthContext.Provider value={{isAuth, user}}>
            <ThemeContext.Provider value={theme}>
                <App/>
            </ThemeContext.Provider>
        </AuthContext.Provider>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userData.userData,
        isAuth: state.userData.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setIsAuth: (isAuth: boolean) => dispatch(setIsAuthAction(isAuth)),
        getUserData: () => dispatch(getCurrentUserData()),
        addDialogMessage: (message: Message) => dispatch(addDialogMessage(message)),
        setWritingUsers: (payload: Message) => dispatch(setWritingUsers(payload)),
        setDialogUsersData: (payload: Message, userId: number) => dispatch(setDialogUsersData(payload, userId)),
        getDialogUsers: () => dispatch(getDialogUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper)