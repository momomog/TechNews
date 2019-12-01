import ProfileAPI from "../api/ProfileAPI";
import {NotificationManager} from "react-notifications";

const SET_CURRENT_USER_DATA = 'SET-CURRENT-USER-DATA';
const SET_USER_DATA = 'SET-USER-DATA';


let initialState = {
    currentUserData: '',
    userData: ''
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER_DATA: {
            return {
                ...state,
                currentUserData: action.currentUserData
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

export const setCurrentUserDataAction = (userData) => ({type: SET_CURRENT_USER_DATA, currentUserData: userData});
export const setUserDataAction = (userData) => ({type: SET_USER_DATA, userData: userData});


export const updateUserData = (userDataRequest) => {
    return (dispatch) => {
        ProfileAPI.onUpdateUserData(userDataRequest)
            .then(response => {
                NotificationManager.success('Ваши данные успешно обновлены', 'Успешно');
            })
            .catch(function (error) {
                NotificationManager.error('Не удалось обновить данные профиля', 'Ошибка');
            });
    };
};

export const getCurrentUserData = (userId) => {
    return (dispatch) => {
        ProfileAPI.getCurrentUser(userId)
            .then(response => {
                dispatch(setCurrentUserDataAction(response));
            })
    };
};

export const getUserData = (username) => {
    return (dispatch) => {
        ProfileAPI.getUserProfile(username)
            .then(response => {
                dispatch(setUserDataAction(response));
            })
    };
};

export const onLoadPhoto = (photoBody) => {
    return (dispatch) => {
        ProfileAPI.onLoadPhoto(photoBody)
            .then(response => {
            })
    };
};