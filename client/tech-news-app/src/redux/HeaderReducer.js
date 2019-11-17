const CHANGE_SECTION = 'CHANGE-SECTION';

let initialState = {
    currentSectionId: 1
};

export const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SECTION: {
            return {
                ...state,
                currentSectionId: action.currentSectionId
            };
        }
        default:
            return state;
    }
};

export const chooseSectionAction = (sectionId) => ({type: CHANGE_SECTION, currentSectionId: sectionId});