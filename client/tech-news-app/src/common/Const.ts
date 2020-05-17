export const NOT_CORRECTLY_SECTION = -1
export const SECTION_ALL_POSTS = 1
export const SECTION_MOBILE = 2
export const SECTION_NOTEBOOKS = 3
export const SECTION_HARDWARE = 4
export const SECTION_OTHER = 5
export const SECTION_GAMES = 6

export const categories = [
    {id: SECTION_MOBILE, title: 'Смартфоны'},
    {id: SECTION_NOTEBOOKS, title: 'Ноутбуки'},
    {id: SECTION_HARDWARE, title: 'Компьютерное железо'},
    {id: SECTION_GAMES, title: 'Игры'},
    {id: SECTION_OTHER, title: 'Разное'}
]

export function getSectionName(sectionId: number): string {
    switch (sectionId) {
        case SECTION_MOBILE:
            return 'mobile'
        case SECTION_NOTEBOOKS:
            return 'notebooks'
        case SECTION_HARDWARE:
            return 'hardware'
        case SECTION_OTHER:
            return 'other'
        case SECTION_GAMES:
            return 'games'
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
        case 'games':
            return SECTION_GAMES
        default:
            return NOT_CORRECTLY_SECTION
    }
}