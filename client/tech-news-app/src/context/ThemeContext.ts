import React from "react";

export const ThemeContext = React.createContext({
    theme: 'light',
    isLight: true,
    isDark: false,
    changeTheme: () => {}
})