import React from 'react';
import {NavLink} from "react-router-dom";
import {
    SECTION_ALL_POSTS,
    SECTION_HARDWARE,
    SECTION_MOBILE,
    SECTION_NOTEBOOKS,
    SECTION_OTHER
} from "../../../common/Const";
import User from "./User/User";

function NavLinks(props) {

    function setPostsAndChangeSection(sectionId) {
        props.setPosts(sectionId);
        props.setPostPage(1);
        props.changeSection(sectionId);
    }

    return (
        <div className="navbar navbar-body">
            <div className="navbar-inner w-100">
                <div className="container">
                    <ul className="nav">
                        <li className="nav-item" onClick={() => {setPostsAndChangeSection(SECTION_ALL_POSTS)}}>
                            <NavLink to="/posts/all" className="navlink">Все новости</NavLink>
                        </li>

                        <li onClick={() => {setPostsAndChangeSection(SECTION_MOBILE)}}>
                            <NavLink to="/posts/mobile" className="navlink">Смартфоны</NavLink>
                        </li>

                        <li onClick={() => {setPostsAndChangeSection(SECTION_NOTEBOOKS)}}>
                            <NavLink to="/posts/notebooks" className="navlink">Ноутбуки</NavLink>
                        </li>
                        <li onClick={() => {setPostsAndChangeSection(SECTION_HARDWARE)}}>
                            <NavLink to="/posts/hardware" className="navlink">Компьютерное железо</NavLink>
                        </li>
                        <li onClick={() => {setPostsAndChangeSection(SECTION_OTHER)}}>
                            <NavLink to="/posts/other" className="navlink">Разное</NavLink>
                        </li>
                    </ul>
                    <ul className="nav navbar-right">
                        <li>
                            <User isAuth={props.isAuth}
                                  currentUserData={props.currentUserData}
                                  setCurrentUserData={props.setCurrentUserData}
                                  setIsAuth={props.setIsAuth}/>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default NavLinks;