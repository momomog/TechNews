import React, {useContext, useState} from 'react'
import searchIcon from '../../../static/search-icon.png'
import {useHistory} from 'react-router-dom'
import {AppThemeContext, ThemeContext} from '../../../context/ThemeContext'
import {History} from 'history'

/**
 * Навигационная панель. Поиск
 */
export const Search: React.FC = () => {
    const history: History = useHistory()
    const [searchText, setSearchText] = useState<string>('')

    const {isLight}: AppThemeContext = useContext(ThemeContext)
    const inputClasses: Array<string> = ['input-group-form', 'search', isLight ? 'background-light' : 'navbar-dark-background']

    const onSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLImageElement>) => {
        const text = searchText.trim()

        if (text) {
            if ('key' in e && e.key !== 'Enter')
                return

            history.push(`/posts/search?search_query=${searchText.trim()}`)
            setSearchText('')
        }
    }

    return (
        <>
            <input type="text"
                   className={inputClasses.join(' ')}
                   placeholder="Поиск по сайту"
                   value={searchText}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                   onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => onSearch(e)}
            />
            <img src={searchIcon}
                 alt="search"
                 className="search-icon"
                 onClick={onSearch}
            />
        </>
    )
}
