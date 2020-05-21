import AuthAPI from '../../api/AuthAPI'
import {NotificationManager} from 'react-notifications'
import history from '../../history'
import AuthService from '../../common/AuthService'
import ProfileAPI from '../../api/ProfileAPI'
import {SetIsAuthAction, SetUserDataAction, User} from '../../models/UserModel'
import {ErrorResponse} from '../../models/ResponseModel'
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

export const login = (loginRequest: SignInRequest, remember?: boolean): any => (dispatch: Dispatch) => {
    AuthAPI.login(loginRequest)
        .then(response => {
            NotificationManager.success('Вы успешно авторизовались в системе', 'Добро пожаловать!')
            AuthService.setToken(response.accessToken, remember)
            dispatch(setIsAuthAction(true))
        })
        .catch(() => NotificationManager.error('Проверьте правильность введенных данных', 'Не удалось войти'))
}

export const getCurrentUserData = (): any => (dispatch: Dispatch) => {
    ProfileAPI.getCurrentUser()
        .then((response: User) => dispatch(setUserDataAction(response)))
        .catch((error: ErrorResponse) => history.push(`/error/${error.code}`))
}