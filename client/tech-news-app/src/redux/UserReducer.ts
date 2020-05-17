import AuthAPI from '../api/AuthAPI'
import {NotificationManager} from 'react-notifications'
import history from '../history'
import AuthService from '../common/AuthService'
import ProfileAPI from '../api/ProfileAPI'
import {SetIsAuthAction, SetUserDataAction, User, UserAction, UserInitial, UserState} from '../models/UserModel'
import {ErrorResponse} from '../models/ResponseModel'
import {Dispatch} from 'redux'
import {SignInRequest} from '../models/RequestsModel'

const SET_IS_AUTH = 'SET-IS-AUTH'
const SET_USER_DATA = 'SET-USER-DATA'


const initialState: UserState = {
    isAuth: false,
    userData: UserInitial
}

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        case SET_USER_DATA: {
            return {
                ...state,
                userData: action.userData
            }
        }
        default:
            return state
    }
}

export const setIsAuthAction = (isAuth: boolean): SetIsAuthAction => ({type: SET_IS_AUTH, isAuth: isAuth})
export const setUserDataAction = (userData: User): SetUserDataAction => ({
    type: SET_USER_DATA,
    userData: userData
})

export const login = (loginRequest: SignInRequest, remember?: boolean): any => {
    return (dispatch: Dispatch) => {
        AuthAPI.login(loginRequest)
            .then(response => {
                NotificationManager.success('Вы успешно авторизовались в системе', 'Добро пожаловать!')
                AuthService.setToken(response.accessToken, remember)
                dispatch(setIsAuthAction(true))
            })
            .catch(() => NotificationManager.error('Проверьте правильность введенных данных', 'Не удалось войти'))
    }
}

export const getCurrentUserData = (): any => {
    return (dispatch: Dispatch) => {
        ProfileAPI.getCurrentUser()
            .then((response: User) => dispatch(setUserDataAction(response)))
            .catch((error: ErrorResponse) => history.push(`/error/${error.code}`))
    }
}