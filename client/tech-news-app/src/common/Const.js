export const SECTION_ALL_POSTS = 1;
export const SECTION_MOBILE = 2;
export const SECTION_NOTEBOOKS = 3;
export const SECTION_HARDWARE = 4;

export function getSectionName(sectionId){
    switch (sectionId) {
        case SECTION_ALL_POSTS: return 'all';
        case SECTION_MOBILE: return 'mobile';
        case SECTION_NOTEBOOKS: return 'notebooks';
        case SECTION_HARDWARE: return 'hardware';
    }
}