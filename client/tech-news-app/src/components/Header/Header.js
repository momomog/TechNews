import React from 'react';
import NavLinks from "./NavLinks/NavLinks";
import Auth from "./Auth/Auth";

function Header() {
    return (
        <div className="container">
            <div className="head">
                <Auth/>
                <NavLinks/>
            </div>
        </div>
    )
}

export default Header;