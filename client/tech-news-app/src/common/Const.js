export const SECTION_ALL_POSTS = 1
export const SECTION_MOBILE = 2
export const SECTION_NOTEBOOKS = 3
export const SECTION_HARDWARE = 4
export const SECTION_OTHER = 5

export const sections = ['all', 'mobile', 'notebooks', 'hardware', 'other']

export function getSectionName(sectionId) {
    switch (+sectionId) {
        case SECTION_MOBILE:
            return 'mobile'
        case SECTION_NOTEBOOKS:
            return 'notebooks'
        case SECTION_HARDWARE:
            return 'hardware'
        case SECTION_OTHER:
            return 'other'
        case SECTION_ALL_POSTS:
        default:
            return 'all'
    }
}

export function getSectionId(sectionName) {
    switch (sectionName) {
        case 'mobile':
            return SECTION_MOBILE
        case 'notebooks':
            return SECTION_NOTEBOOKS
        case 'hardware':
            return SECTION_HARDWARE
        case 'other':
            return SECTION_OTHER
        case 'all':
        default:
            return SECTION_ALL_POSTS
    }
}