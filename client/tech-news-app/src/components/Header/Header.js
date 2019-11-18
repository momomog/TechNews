import React from 'react';
import NavLinks from "./NavLinks/NavLinks";
import LoginWrapper from "./Login/LoginWrapper";

function Header(props) {
    return (
        <div className="container">
            <div className="head">
                <LoginWrapper changeSection={props.changeSection}
                       setPosts={props.setPosts}
                       setPostPage={props.setPostPage}/>
                <NavLinks changeSection={props.changeSection}
                          setPosts={props.setPosts}
                          setPostPage={props.setPostPage}
                          sectionId={props.sectionId}/>
            </div>
        </div>
    )
}

export default Header;