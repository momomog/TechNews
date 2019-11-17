import React from 'react';
import NavLinks from "./NavLinks/NavLinks";
import TopHeader from "./TopHeader/TopHeader";

function Header(props) {
    return (
        <div className="container">
            <div className="head">
                <TopHeader changeSection={props.changeSection}
                           setPosts={props.setPosts}
                           setCurrentPostPage={props.setCurrentPostPage}/>
                <NavLinks changeSection={props.changeSection}
                          setPosts={props.setPosts}
                          setCurrentPostPage={props.setCurrentPostPage}
                          currentSectionId={props.currentSectionId}/>
            </div>
        </div>
    )
}

export default Header;