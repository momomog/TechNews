import React from 'react';
import {NavLink} from "react-router-dom";
import {SECTION_ALL_POSTS} from "../../../common/Const";
import AuthButton from "./AuthButton/AuthButton";
import User from "./User/User";

function Login(props) {

    //изменяет секцию на "все новости", ставит активную первую страницу пагинации
    function clickLogo() {
        props.setPosts(SECTION_ALL_POSTS);
        props.setPostPage(1);
        props.changeSection(SECTION_ALL_POSTS);
    }

    return (
        <div className="row-fluid">
            <div className="span12">
                <div className="span9">
                    <h1 className="muted" onClick={clickLogo}>
                        <NavLink to="/posts/all" className="site-logo">Tech-news</NavLink>
                    </h1>
                </div>
                <div className="span3 auth-button">

                    {
                        props.isAuth
                            ? <User/>
                            : <AuthButton/>
                    }

                </div>
            </div>
        </div>
    )
}

export default Login;