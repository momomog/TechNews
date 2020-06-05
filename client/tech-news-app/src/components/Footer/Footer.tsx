import React from 'react'
import {NavLink} from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="page-footer font-small special-color-dark pt-4">
            <div className="container">
                <div className="text-center center-block">
                    <a href="https://www.facebook.com">
                        <i id="social-fb" className="fa fa-facebook-square fa-3x social"/>
                    </a>
                    <a href="https://twitter.com">
                        <i id="social-tw" className="fa fa-twitter-square fa-3x social"/>
                    </a>
                    <a href="https://plus.google.com">
                        <i id="social-gp" className="fa fa-google-plus-square fa-3x social"/>
                    </a>
                    <a href="mailto:momomogggq@gmail.com">
                        <i id="social-em" className="fa fa-envelope-square fa-3x social"/>
                    </a>
                </div>
                <div className="text-center py-3 copyright">© 2019-2020 Copyright:
                    <NavLink to="/" onClick={() => window.scroll(0, 0)}> tech-news.ru</NavLink>
                </div>
            </div>
        </footer>
    )
}

export default Footer