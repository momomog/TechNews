import React from 'react';
import {NavLink} from "react-router-dom";

function NavLinks() {
    return (
        <div className="navbar navbar-body">
            <div className="navbar-inner">
                <div className="container">
                    <ul className="nav">
                        <li>
                            <NavLink to="/all" className="navlink">Все новости</NavLink>
                        </li>

                        <li>
                            <NavLink to="#" className="navlink">Смартфоны</NavLink>
                        </li>

                        <li>
                            <NavLink to="#" className="navlink">Ноутбуки</NavLink>
                        </li>
                        <li>
                            <NavLink to="#" className="navlink">Компьютерное железо</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavLinks;