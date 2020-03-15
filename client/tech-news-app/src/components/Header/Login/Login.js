import React from 'react';
import {SECTION_ALL_POSTS} from "../../../common/Const";
import AuthButton from "./AuthButton/AuthButton";
import logo from '../../../static/logo.png'
import {NavLink} from "react-router-dom";

function Login(props) {

    //изменяет секцию на "все новости", ставит активную первую страницу пагинации
    function onLogoClick() {
        props.setPosts(SECTION_ALL_POSTS);
        props.setPostPage(1);
        props.changeSection(SECTION_ALL_POSTS);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 d-flex align-content-center">
                    <NavLink to="/posts/all">
                        <img src={logo} alt="" width="60%" height="50%" onClick={onLogoClick}/>
                    </NavLink>
                </div>
                <div className="col-sm-3 d-flex align-items-end">

                    {
                        !props.isAuth && <AuthButton/>
                    }

                </div>
            </div>
        </div>
    )
}

export default Login