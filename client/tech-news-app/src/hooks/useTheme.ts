import {useEffect, useState} from 'react'

const LIGHT_THEME = 'light'
const DARK_THEME = 'dark'

const LIGHT_THEME_BACKGROUND = 'linear-gradient(to right, #c4c0ad, #DBDBDB, #F2F2F2, #c4c0ad)'
const DARK_THEME_BACKGROUND = 'linear-gradient(to right, #262424, #908d8d, #908d8d, #262424)'

export type Theme = {
    theme: string
    isLight: boolean
    isDark: boolean
    changeTheme: () => void
}

/**
 * Хук глобальной темы приложения
 */
export const useTheme = (): Theme => {
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || LIGHT_THEME)

    useEffect(() => {
        document.body.style.background = theme === LIGHT_THEME
            ? LIGHT_THEME_BACKGROUND
            : DARK_THEME_BACKGROUND
    }, [theme])

    const changeTheme = () => {
        const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    return {
        theme,
        isLight: theme === LIGHT_THEME,
        isDark: theme === DARK_THEME,
        changeTheme
    }
}
