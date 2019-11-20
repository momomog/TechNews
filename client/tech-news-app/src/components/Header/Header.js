import React from 'react';
import NavLinks from "./NavLinks/NavLinks";
import Login from "./Login/Login";

function Header(props) {
    return (
        <div className="container">
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
                          userData={props.userData}
                          setIsAuth={props.setIsAuth}
                          setUserData={props.setUserData}/>
            </div>
        </div>
    )
}

export default Header;