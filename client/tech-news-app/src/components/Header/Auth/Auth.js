import React from 'react';
import '../../../styles/Header.css'

function Auth() {
    return (
        <div className="row-fluid">
            <div className="span12">
                <div className="span6">
                    <h1 className="muted">Tech-news</h1>
                </div>
                <div className="span4 offset2 auth-button">
                    <a className="btn btn-info pull-right" href="http://localhost:8080/login">Войти</a>
                    <a className="btn btn-info pull-right" href="http://localhost:8080/registration">Регистрация</a>
                </div>
            </div>
        </div>
    )
}

export default Auth;