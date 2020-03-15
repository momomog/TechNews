import AuthAPI from "../api/AuthAPI";
import Common from "../common/Common";
import {NotificationManager} from "react-notifications";
import AuthService from "../common/AuthService";
import ProfileAPI from "../api/ProfileAPI";


const SET_IS_AUTH = 'SET-IS-AUTH';
const SET_CURRENT_USER_DATA = 'SET-CURRENT-USER-DATA';
const SET_USER_DATA = 'SET-USER-DATA';


let initialState = {
    isAuth: AuthService.isAuth(),
    currentUserData: '',
    userData: ''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth,
            }
        }
        case SET_CURRENT_USER_DATA: {
            return {
                ...state,
                currentUserData: action.currentUserData
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

export const setIsAuthAction = (isAuth) => ({type: SET_IS_AUTH, isAuth: isAuth});
export const setCurrentUserDataAction = (userData) => ({type: SET_CURRENT_USER_DATA, currentUserData: userData});
export const setUserDataAction = (userData) => ({type: SET_USER_DATA, userData: userData});

export const login = (loginRequest, remember) => {
    return dispatch => {
        AuthAPI.login(loginRequest)
            .then(response => {
                NotificationManager.success('Вы успешно авторизовались в системе', 'Добро пожаловать!');
                AuthService.setToken(response.accessToken, remember);
                dispatch(setIsAuthAction(true));
            })
            .catch(function (error) {
                NotificationManager.error(Common.showErrorText(error.code), 'Не удалось войти');
            })
    }
}

export const getCurrentUserData = userId => {
    return dispatch => {
        ProfileAPI.getCurrentUser(userId)
            .then(response => {
                dispatch(setCurrentUserDataAction(response));
            })
    }
}

export const getUserData = username => {
    return dispatch => {
        ProfileAPI.getUserProfile(username)
            .then(response => {
                dispatch(setUserDataAction(response));
            })
    }
}