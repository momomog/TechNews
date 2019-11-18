const CHANGE_SECTION = 'CHANGE-SECTION';


let initialState = {
    sectionId: 1
};

export const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SECTION: {
            return {
                ...state,
                sectionId: action.sectionId
            };
        }
        default:
            return state;
    }
};

export const chooseSectionAction = (sectionId) => ({type: CHANGE_SECTION, sectionId: sectionId});