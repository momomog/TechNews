import {useEffect, useState} from 'react'

const LIGHT_THEME = 'light'
const DARK_THEME = 'dark'

/**
 * Хук глобальной темы приложения
 */
export const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || LIGHT_THEME)

    useEffect(() => {
        if (theme) {
            document.body.style.background = theme === LIGHT_THEME
                ? 'linear-gradient(to right, #c4c0ad, #DBDBDB, #F2F2F2, #c4c0ad)'
                : 'linear-gradient(to right, #262424, #908d8d, #908d8d, #262424)'
        } else {
            document.body.style.background = 'linear-gradient(to right, #c4c0ad, #DBDBDB, #F2F2F2, #c4c0ad)'
        }
    }, [theme, setTheme])

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