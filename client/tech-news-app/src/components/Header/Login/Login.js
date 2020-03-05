import React from 'react';
import {NavLink} from "react-router-dom";
import {SECTION_ALL_POSTS} from "../../../common/Const";
import AuthButton from "./AuthButton/AuthButton";

function Login(props) {

    //изменяет секцию на "все новости", ставит активную первую страницу пагинации
    function clickLogo() {
        props.setPosts(SECTION_ALL_POSTS);
        props.setPostPage(1);
        props.changeSection(SECTION_ALL_POSTS);
    }

    return (
        <div className="row-fluid container ">
            <div className="span12">
                <div className="span9">
                    <h1 className="muted mt" onClick={clickLogo}>
                        <NavLink to="/posts/all" className="site-logo">Tech-news</NavLink>
                    </h1>
                </div>
                <div className=" auth-button">

                    {
                        props.isAuth
                            ? ''
                            : <AuthButton/>
                    }

                </div>
            </div>
        </div>
    )
}

export default Login;