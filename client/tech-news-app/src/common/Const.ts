export const IS_NOT_CORRECTLY_SECTION = -1
export const SECTION_ALL_POSTS = 1
export const SECTION_MOBILE = 2
export const SECTION_NOTEBOOKS = 3
export const SECTION_HARDWARE = 4
export const SECTION_OTHER = 5

export function getSectionName(sectionId: number): string {
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
            return 'all'
        default:
            return 'not_correctly_name'
    }
}

export function getSectionId(sectionName: string): number {
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
            return SECTION_ALL_POSTS
        default:
            return IS_NOT_CORRECTLY_SECTION
    }
}