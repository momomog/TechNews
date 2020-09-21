import {UserAction, UserInitial, UserState} from '../../models/UserModel'
import {SET_IS_AUTH, SET_USER_DATA} from '../actions/userActions'


export const initialState: UserState = {
    isAuth: false,         // авторизация
    userData: UserInitial  // данные авторизованного пользователя
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