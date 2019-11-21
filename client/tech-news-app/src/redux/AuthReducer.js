import AuthAPI from "../api/AuthAPI";
import Common from "../common/Common";
import {NotificationManager} from "react-notifications";

const CHANGE_SECTION = 'CHANGE-SECTION';
const SET_IS_AUTH = 'SET-IS-AUTH';
const SET_USER_ID = 'SET-USER_ID';
const SET_ERROR_AUTH_CODE = 'SET-ERROR-AUTH-CODE';
const SET_USER_DATA = 'SET-USER-DATA';


let initialState = {
    sectionId: 1,
    isAuth: !!localStorage.getItem('accessToken'),
    userId: '',
    authErrorCode: '',
    userData: ''
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SECTION: {
            return {
                ...state,
                sectionId: action.sectionId
            };
        }
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth,
            };
        }
        case SET_USER_ID: {
            return {
                ...state,
                userId: action.userId,
            };
        }
        case SET_ERROR_AUTH_CODE: {
            return {
                ...state,
                authErrorCode: action.authErrorCode
            };
        }
        case SET_USER_DATA: {
            return {
                ...state,
                userData: action.userData
            };
        }
        default:
            return state;
    }
};

export const chooseSectionAction = (sectionId) => ({type: CHANGE_SECTION, sectionId: sectionId});
export const setIsAuthAction = (isAuth) => ({type: SET_IS_AUTH, isAuth: isAuth});
export const setUserIdAction = (userId) => ({type: SET_USER_ID, userId: userId});
export const setAuthErrorCodeAction = (code) => ({type: SET_ERROR_AUTH_CODE, authErrorCode: code});
export const setUserDataAction = (userData) => ({type: SET_USER_DATA, userData: userData});

export const login = (loginRequest) => {
    return (dispatch) => {
        AuthAPI.login(loginRequest)
            .then(response => {
                NotificationManager.success('Вы успешно авторизовались в системе', 'Добро пожаловать');
                localStorage.setItem('accessToken', response.accessToken);
                let decodeToken = Common.decodeJWTToken(response.accessToken);
                dispatch(setUserIdAction(decodeToken.sub));
                dispatch(setIsAuthAction(true));
            })
            .catch(function (error) {
                dispatch(setAuthErrorCodeAction(error.code));
                if (error.message)
                    dispatch(setAuthErrorCodeAction(error.message));
            });
    };
};

export const getUserData = (userId) => {
    return (dispatch) => {
        AuthAPI.getCurrentUser(userId)
            .then(response => {
                dispatch(setUserDataAction(response));
                dispatch(setUserIdAction(userId));
            })
    };
};