import React from 'react'
import {NavLink} from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="container footer">
                <div className="center-block">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="group-name">О сайте</div>
                            <hr/>
                            <ul className="about">
                                <li>
                                    <NavLink to="/history">
                                        История создания
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/technologies">
                                        Используемые технологии
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/project-struct">
                                        Структура проекта
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <div className="group-name">Контакты</div>
                            <hr/>
                            <ul className="about">
                                <a href="https://www.vk.com/id47945255"
                                   target="_blank" rel="noopener noreferrer">
                                    <i id="social-fb" className="vk-icon active-soc"/>
                                </a>
                                <a href="https://github.com/momomog"
                                   target="_blank" rel="noopener noreferrer">
                                    <i id="social-fb" className="icon-github active-soc"/>
                                </a>
                                <a href="https://t.me/Sscre4m"
                                   target="_blank" rel="noopener noreferrer">
                                    <i id="social-fb" className="telegram-icon active-soc"/>
                                </a>
                                <a href="https://www.instagram.com/sergeyscre4m"
                                   target="_blank" rel="noopener noreferrer">
                                    <i id="social-gp"
                                       className="instagram-icon active-soc"/>
                                </a>
                                <a href="https://www.facebook.com/patrickstarn1"
                                   target="_blank" rel="noopener noreferrer">
                                    <i id="social-fb"
                                       className="facebook-icon active-soc"/>
                                </a>
                            </ul>
                        </div>
                        <div className="col-md-6 mt-5">
                            <div>По всем вопросам обращайтесь через контакты,</div>
                            <div>либо по email:</div>
                            <a href="mailto:momomogggq@gmail.com" target="_blank" rel="noopener noreferrer">
                                <div className="email-link">momomogggq@gmail.com</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center py-3 mt-2 copyright">© 2019-2020 Copyright:
                    <NavLink to="/"> tech-news.ru</NavLink>
                </div>
            </div>
        </div>

    )
}

export default Footer