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

interface Props {
    isAuth: boolean
    user: User
    setIsAuth: (isAuth: boolean) => UserAction,
    getUserData: () => void
}

/**
 * Оболочка для корневого компонента
 * @param isAuth
 * @param user
 * @param setIsAuth
 * @param getUserData
 */
const AppWrapper: React.FC<Props> = ({setIsAuth, getUserData, isAuth, user}) => {
    const theme = useTheme()

    useEffect(() => {
        if (AuthService.isAuth()) {
            setIsAuth(true)
            getUserData()
        }
    }, [setIsAuth, getUserData])

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
        getUserData: () => dispatch(getCurrentUserData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper)