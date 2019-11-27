import React from 'react';
import NavLinks from "./NavLinks/NavLinks";
import Login from "./Login/Login";
import {NotificationContainer} from "react-notifications";

function Header(props) {
    return (
        <div className="container">
            <NotificationContainer/>
            <div className="head">
                <Login changeSection={props.changeSection}
                       setPosts={props.setPosts}
                       setPostPage={props.setPostPage}
                       isAuth={props.isAuth}/>
                <NavLinks changeSection={props.changeSection}
                          setPosts={props.setPosts}
                          setPostPage={props.setPostPage}
                          sectionId={props.sectionId}
                          isAuth={props.isAuth}
                          currentUserData={props.currentUserData}
                          setIsAuth={props.setIsAuth}
                          setCurrentUserData={props.setCurrentUserData}/>
            </div>
        </div>
    )
}

export default Header;