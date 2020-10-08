import React from 'react'
import NavLinks from './NavLinks/NavLinks'
import Login from './Login/Login'
import {NotificationContainer} from 'react-notifications'


/**
 * Шапка сайта
 */
const Header: React.FC = () => {
    return (
        <div className="header-wrapper">
            <NotificationContainer/>
            <Login/>
            <NavLinks/>
        </div>
    )
}

export default Header
