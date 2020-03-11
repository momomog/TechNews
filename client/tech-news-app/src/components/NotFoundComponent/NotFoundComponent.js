import React from "react";
import {NavLink} from "react-router-dom";

function NotFoundComponent() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>404</h1>
                        <h2 className="mb-4">Запрашиваемая страница не найдена</h2>
                        <div className="error-details">
                            <p>Проверьте правильность введенных данных и повторите попытку</p>
                        </div>
                        <div className="error-actions">
                            <NavLink to="/" className="btn btn-default btn-lg">
                                <span className="glyphicon glyphicon-home"/>
                                &nbsp;На главную
                            </NavLink>
                            <a href="mailto:momomogggq@gmail.com" className="btn btn-default btn-lg">
                                <span className="glyphicon glyphicon-envelope"/>
                                &nbsp;Написать нам
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundComponent