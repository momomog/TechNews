import AuthAPI from '../../api/AuthAPI'
import {NotificationManager} from 'react-notifications'
import history from '../../history'
import AuthService from '../../common/AuthService'
import ProfileAPI from '../../api/ProfileAPI'
import {SetIsAuthAction, SetUserDataAction, User} from '../../models/UserModel'
import {Dispatch} from 'redux'
import {SignInRequest} from '../../models/RequestsModel'

export const SET_IS_AUTH = 'SET-IS-AUTH'
export const SET_USER_DATA = 'SET-USER-DATA'


export const setIsAuthAction = (isAuth: boolean): SetIsAuthAction => ({
    type: SET_IS_AUTH,
    isAuth: isAuth
})
export const setUserDataAction = (userData: User): SetUserDataAction => ({
    type: SET_USER_DATA,
    userData: userData
})

export const login = (loginRequest: SignInRequest, remember?: boolean): any => async (dispatch: Dispatch) => {
    try {
        const response = await AuthAPI.login(loginRequest)
        if (!response.success && response.message) {
            NotificationManager.error('Необходимо подтвердить свой почтовый адрес', 'Не удалось войти')
        } else {
            NotificationManager.success('Вы успешно авторизовались в системе', 'Добро пожаловать!')
            AuthService.setToken(response.accessToken, remember)
            dispatch(setIsAuthAction(true))
            history.push(`/profile`)
        }
    } catch (e) {
        NotificationManager.error('Проверьте правильность введенных данных', 'Не удалось войти')
    }
}

export const getCurrentUserData = () => async (dispatch: Dispatch) => {
    try {
        const user: User = await ProfileAPI.getCurrentUser()
        dispatch(setUserDataAction(user))
    } catch (error) {
        history.push(`/error/${error.code}`)
    }
}