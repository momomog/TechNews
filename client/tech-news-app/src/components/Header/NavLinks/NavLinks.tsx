import React, {useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {
    SECTION_ALL_POSTS,
    SECTION_HARDWARE,
    SECTION_MOBILE,
    SECTION_NOTEBOOKS,
    SECTION_OTHER
} from "../../../common/Const";
import {ChangeSectionAction, SetPostPageAction} from "../../../models/PostModel";
import searchIcon from "../../../static/search-icon.png";

interface Props {
    sectionId: number
    setPosts: (sectionId: number) => void
    changeSection: (sectionId: number) => ChangeSectionAction
    setPostPage: (pageNumber: number) => SetPostPageAction
}

/**
 *
 * @param setPosts
 * @param sectionId
 * @param setPostPage
 * @param changeSection
 * Панель навигации по категории постов
 */
const NavLinks: React.FC<Props> = ({setPosts, sectionId, setPostPage, changeSection}) => {
    const [searchText, setSearchText] = useState<string>('')
    const history = useHistory()

    const setPostsAndChangeSection = (sectionId: number) => {
        setPosts(sectionId)
        setPostPage(1)
        changeSection(sectionId)
    }

    const onSearch = () => {
        if (searchText.trim()) {
            history.push(`/posts/search?search_query=${searchText.trim()}`)
            setSearchText('')
        }
    }

    return (
        <div className="navbar w-100 container">
            <div className="navbar-inner navbar-body">
                <div className="container">
                    <ul className="nav">

                        <li className="nav-item" onClick={() => setPostsAndChangeSection(SECTION_ALL_POSTS)}>
                            <NavLink to="/posts/all" activeStyle={{color: '#13263e'}} className="navlink">
                                Все новости
                            </NavLink>
                        </li>

                        <li onClick={() => setPostsAndChangeSection(SECTION_MOBILE)}>
                            <NavLink to="/posts/mobile" activeStyle={{color: '#13263e'}} className="navlink">
                                Смартфоны
                            </NavLink>
                        </li>

                        <li onClick={() => setPostsAndChangeSection(SECTION_NOTEBOOKS)}>
                            <NavLink to="/posts/notebooks" activeStyle={{color: '#13263e'}} className="navlink">
                                Ноутбуки
                            </NavLink>
                        </li>

                        <li onClick={() => setPostsAndChangeSection(SECTION_HARDWARE)}>
                            <NavLink to="/posts/hardware" activeStyle={{color: '#13263e'}} className="navlink">
                                Компьютерное железо
                            </NavLink>
                        </li>

                        <li onClick={() => setPostsAndChangeSection(SECTION_OTHER)}>
                            <NavLink to="/posts/other" activeStyle={{color: '#13263e'}} className="navlink">
                                Разное
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="nav navbar-right">
                        <li>
                            <input type="text"
                                   className="input-group-form search"
                                   placeholder="Поиск по сайту"
                                   value={searchText}
                                   onChange={e => setSearchText(e.target.value)}
                                   onKeyPress={e => {
                                       if (e.key === 'Enter') {
                                           e.preventDefault()
                                           onSearch()
                                       }
                                   }}
                                   style={{
                                       backgroundImage: `url(${searchIcon})`,
                                       backgroundPosition: `96% 50%`,
                                       backgroundRepeat: `no-repeat`
                                   }}
                            />
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default NavLinks