import React from 'react';
import {NavLink} from "react-router-dom";

function NavLinks() {
    return (
        <div className="navbar">
            <div className="navbar-inner">
                <div className="container">
                    <ul className="nav">
                        <li>
                            <NavLink to="/all">Все новости</NavLink>
                        </li>

                        <li>
                            <a href="#">Смартфоны</a>
                        </li>

                        <li>
                            <a href="#">Ноутбуки</a>
                        </li>
                        <li>
                            <a href="#">Компьютерное железо</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavLinks;