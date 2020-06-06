import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {
    SECTION_ALL_POSTS,
    SECTION_GAMES,
    SECTION_HARDWARE,
    SECTION_MOBILE,
    SECTION_NOTEBOOKS,
    SECTION_OTHER
} from '../../../common/Const'
import {ChangeSectionAction, SetPostPageAction} from '../../../models/PostModel'
import {Search} from './Search'
import {ThemeContext} from '../../../context/ThemeContext'

interface Props {
    setPosts: (sectionId: number) => void
    changeSection: (sectionId: number) => ChangeSectionAction
    setPostPage: (pageNumber: number) => SetPostPageAction
}

/**
 * Панель навигации по категории постов
 * @param setPosts
 * @param setPostPage
 * @param changeSection
 */
const NavLinks: React.FC<Props> = ({setPosts, setPostPage, changeSection}) => {
    const {isLight} = useContext(ThemeContext)
    const navbarClasses = ['navbar', 'navbar-expand-lg', isLight ? 'background-light' : 'navbar-dark-background']

    const setPostsAndChangeSection = (sectionId: number) => {
        setPosts(sectionId)
        setPostPage(1)
        changeSection(sectionId)
    }

    return (
        <div className="navbar w-100 container">
            <div className="navbar-inner navbar-body">
                <nav className={navbarClasses.join(' ')}>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa fa-bars navbar-icon" aria-hidden="true"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item" onClick={() => setPostsAndChangeSection(SECTION_ALL_POSTS)}>
                                <NavLink to="/posts/all" activeClassName="navlink-active" className="navlink">
                                    Все новости
                                </NavLink>
                            </li>
                            <li onClick={() => setPostsAndChangeSection(SECTION_MOBILE)}>
                                <NavLink to="/posts/mobile" activeClassName="navlink-active" className="navlink">
                                    Смартфоны
                                </NavLink>
                            </li>

                            <li onClick={() => setPostsAndChangeSection(SECTION_NOTEBOOKS)}>
                                <NavLink to="/posts/notebooks" activeClassName="navlink-active" className="navlink">
                                    Ноутбуки
                                </NavLink>
                            </li>

                            <li onClick={() => setPostsAndChangeSection(SECTION_HARDWARE)}>
                                <NavLink to="/posts/hardware" activeClassName="navlink-active" className="navlink">
                                    Компьютерное железо
                                </NavLink>
                            </li>

                            <li onClick={() => setPostsAndChangeSection(SECTION_GAMES)}>
                                <NavLink to="/posts/games" activeClassName="navlink-active" className="navlink">
                                    Игры
                                </NavLink>
                            </li>

                            <li onClick={() => setPostsAndChangeSection(SECTION_OTHER)}>
                                <NavLink to="/posts/other" activeClassName="navlink-active" className="navlink">
                                    Разное
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="nav navbar-right">
                            <li>
                                <Search/>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavLinks