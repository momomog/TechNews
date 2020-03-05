import ProfileAPI from "../api/ProfileAPI";

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
}

export const setCurrentUserDataAction = (userData) => ({type: SET_CURRENT_USER_DATA, currentUserData: userData});
export const setUserDataAction = (userData) => ({type: SET_USER_DATA, userData: userData});

export const getCurrentUserData = (userId) => {
    return (dispatch) => {
        ProfileAPI.getCurrentUser(userId)
            .then(response => {
                dispatch(setCurrentUserDataAction(response));
            })
    };
}

export const getUserData = (username) => {
    return (dispatch) => {
        ProfileAPI.getUserProfile(username)
            .then(response => {
                dispatch(setUserDataAction(response));
            })
    };
}