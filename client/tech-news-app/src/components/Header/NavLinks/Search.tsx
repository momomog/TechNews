import React, {useContext, useState} from 'react'
import searchIcon from '../../../static/search-icon.png'
import {useHistory} from 'react-router-dom'
import {ThemeContext} from '../../../context/ThemeContext'

/**
 * Навигационная панель. Поиск
 */
export const Search: React.FC = () => {
    const history = useHistory()
    const [searchText, setSearchText] = useState<string>('')

    const {isLight} = useContext(ThemeContext)
    const inputClasses = ['input-group-form', 'search', isLight ? 'background-light' : 'navbar-dark-background']

    const onSearch = (e) => {
        if (e.key === 'Enter' && searchText.trim()) {
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
                   onChange={e => setSearchText(e.target.value)}
                   onKeyPress={e => onSearch(e)}
            />
            <img src={searchIcon}
                 alt="search"
                 className="search-icon"
                 onClick={onSearch}
            />
        </>
    )
}