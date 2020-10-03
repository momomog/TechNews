import React from 'react'

export type AppThemeContext = {
    theme: string
    isLight: boolean
    isDark: boolean
    changeTheme: () => void
}

export const ThemeContext: React.Context<AppThemeContext> = React.createContext<AppThemeContext>({
    theme: 'light',
    isLight: true,
    isDark: false,
    changeTheme: () => {}
})
