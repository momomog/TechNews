import React from 'react';
import NavLinks from "./NavLinks/NavLinks";
import TopHeader from "./TopHeader/TopHeader";

function Header(props) {
    return (
        <div className="container">
            <div className="head">
                <TopHeader changeSection={props.changeSection}
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