import AuthAPI from "../api/AuthAPI";
import Common from "../common/Common";
import {NotificationManager} from "react-notifications";

const CHANGE_SECTION = 'CHANGE-SECTION';
const SET_IS_AUTH = 'SET-IS-AUTH';
const SET_USERNAME_AVAILABILITY = 'SET-USERNAME-AVAILABILITY';
const SET_EMAIL_AVAILABILITY = 'SET-EMAIL-AVAILABILITY';


let initialState = {
    sectionId: 1,
    isAuth: Common.getToken(),
    isUsernameAvailability: true,
    isEmailAvailability: true
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
        case SET_USERNAME_AVAILABILITY: {
            return {
                ...state,
                isUsernameAvailability: action.isAvailable
            };
        }
        case SET_EMAIL_AVAILABILITY: {
            return {
                ...state,
                isEmailAvailability: action.isAvailable
            };
        }
        default:
            return state;
    }
};

export const chooseSectionAction = (sectionId) => ({type: CHANGE_SECTION, sectionId: sectionId});
export const setIsAuthAction = (isAuth) => ({type: SET_IS_AUTH, isAuth: isAuth});
export const setUsernameAvailabilityAction = (isAvailable) => ({type: SET_USERNAME_AVAILABILITY, isAvailable: isAvailable});
export const setEmailAvailabilityAction = (isAvailable) => ({type: SET_EMAIL_AVAILABILITY, isAvailable: isAvailable});

export const login = (loginRequest) => {
    return (dispatch) => {
        AuthAPI.login(loginRequest)
            .then(response => {
                NotificationManager.success('Вы успешно авторизовались в системе', 'Добро пожаловать!');
                Common.setToken(response.accessToken);
                dispatch(setIsAuthAction(true));
            })
            .catch(function (error) {
                let errorMessage = Common.showErrorText(error.code);
                NotificationManager.error(errorMessage, 'Не удалось войти');
            });
    };
};

export const signup = (signupRequest) => {
    return (dispatch) => {
        AuthAPI.signup(signupRequest)
            .then(response => {
                NotificationManager.success('Для продолжения работы войдите на сайт', 'Вы успешно зарегистрировались');
                Common.changeLocation('/authorization', 400);
            })
            .catch(function (error) {
                NotificationManager.error('При попытке регистрации произошла неизвестная ошибка', 'Ошибка');
            });
    };
};

export const checkUsernameAvailability = (userName) => {
    return (dispatch) => {
        AuthAPI.checkUsernameAvailability(userName)
            .then(response => {
                dispatch(setUsernameAvailabilityAction(response.available));
            })
    };
};

export const checkEmailAvailability = (email) => {
    return (dispatch) => {
        AuthAPI.checkEmailAvailability(email)
            .then(response => {
                dispatch(setEmailAvailabilityAction(response.available));
            })
    };
};