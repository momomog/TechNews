const CHANGE_SECTION = 'CHANGE-SECTION';
const SET_IS_AUTH = 'SET-IS-AUTH';
const SET_USER_DATA = 'SET-USER-DATA';


let initialState = {
    sectionId: 1,
    isAuth: false,
    userData: {}
};

export const headerReducer = (state = initialState, action) => {
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
                isAuth: action.isAuth
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
export const setUserDataAction = (userData) => ({type: SET_USER_DATA, userData: userData});