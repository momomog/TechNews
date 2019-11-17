import React from 'react';
import {NavLink} from "react-router-dom";
import {SECTION_ALL_POSTS} from "../../../common/Const";

function TopHeader(props) {

    //изменяет секцию на "все новости", ставит активную первую страницу пагинации
    function clickLogo() {
        props.setPosts(SECTION_ALL_POSTS);
        props.setCurrentPostPage(1);
        props.changeSection(SECTION_ALL_POSTS);
    }
    return (
        <div className="row-fluid">
            <div className="span12">
                <div className="span6">
                    <h1 className="muted" onClick={clickLogo}>
                        <NavLink to="/posts/all" className="site-logo">Tech-news</NavLink>
                    </h1>
                </div>
                <div className="span4 offset2 auth-button">
                    <NavLink className="btn btn-info pull-right sing-in-button" to="http://localhost:8080/login">Войти</NavLink>
                    <NavLink className="btn btn-info pull-right" to="http://localhost:8080/registration">Регистрация</NavLink>
                </div>
            </div>
        </div>
    )
}

export default TopHeader;