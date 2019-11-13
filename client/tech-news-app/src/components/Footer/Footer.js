import React from 'react';

function Footer() {
    return (
        <footer className="page-footer font-small special-color-dark pt-4">
            <div className="container">
                <div className="text-center center-block">
                    <a href="https://www.facebook.com/bootsnipp">
                        <i id="social-fb" className="fa fa-facebook-square fa-3x social"></i>
                    </a>
                    <a href="https://twitter.com/bootsnipp">
                        <i id="social-tw" className="fa fa-twitter-square fa-3x social"></i>
                    </a>
                    <a href="https://plus.google.com/+Bootsnipp-page">
                        <i id="social-gp" className="fa fa-google-plus-square fa-3x social"></i>
                    </a>
                    <a href="mailto:bootsnipp@gmail.com">
                        <i id="social-em" className="fa fa-envelope-square fa-3x social"></i>
                    </a>
                </div>
                <div className="footer-copyright text-center py-3 copyright">© 2019 Copyright:
                    <a href="https://mdbootstrap.com/education/bootstrap/"> tech-news.ru</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;