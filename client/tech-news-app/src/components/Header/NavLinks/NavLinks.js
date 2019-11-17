import React from 'react';
import {NavLink} from "react-router-dom";
import {SECTION_ALL_POSTS, SECTION_HARDWARE, SECTION_MOBILE, SECTION_NOTEBOOKS} from "../../../common/Const";

function NavLinks(props) {

    function setPostsAndChangeSection(sectionId) {
        debugger
        props.setPosts(sectionId);
        props.setCurrentPostPage(1);
        props.changeSection(sectionId);
    }

    return (
        <div className="navbar navbar-body">
            <div className="navbar-inner w-100">
                <div className="container">
                    <ul className="nav">
                        <li onClick={() => {setPostsAndChangeSection(SECTION_ALL_POSTS)}}>
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
                    </ul>
                </div>
            </div>
        </div>
    );

    // function setLinkClass() {
    //     if (props.currentSectionId)
    // }

}

export default NavLinks;