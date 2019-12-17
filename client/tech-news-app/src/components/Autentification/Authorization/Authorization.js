import React from "react";
import {NavLink, Redirect} from "react-router-dom";


class Authorization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
    }

    onLoginClick = () => {
        this.props.onLogin({
            usernameOrEmail: this.state.login,
            password: this.state.password
        });

    };

    onLoginFieldsChange = (e) => {
        if (e.target.name === 'usernameOrEmail') {
            this.setState({login: e.target.value})
        }
        if (e.target.name === 'password') {
            this.setState({password: e.target.value})
        }
    };

    render() {
        return (
            this.props.isAuth
                ? <Redirect to="profile"/>
                : <div className="container">
                    <div id="loginbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 mt-5">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <div className="panel-title">Войти</div>
                            </div>

                            <div className="panel-body pt-5">
                                <form id="loginform" className="form-horizontal" role="form">
                                    <div className="input-group mb-3">
                                        <span className="input-group-addon">
                                            <i className="glyphicon glyphicon-user"/>
                                        </span>
                                        <input id="login-username" type="text" className="input-group-form"
                                               name="usernameOrEmail" onChange={this.onLoginFieldsChange}
                                               placeholder="имя пользователя или почта"
                                               required/>
                                    </div>
                                    <div className="input-group mb-2">
                                        <span className="input-group-addon">
                                            <i className="glyphicon glyphicon-lock"/>
                                        </span>
                                        <input id="login-password" type="password" className="input-group-form"
                                               name="password" onChange={this.onLoginFieldsChange}
                                               placeholder="пароль" required/>
                                    </div>

                                    <div className="input-group">
                                        <div className="checkbox input-group-checkbox mt-2">
                                            <label>
                                                <input id="login-remember" type="checkbox" name="remember" value="1"/>
                                                Запомнить
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group mt-2">
                                        <div className="col-sm-12">
                                            <a id="btn-login" href="#" className="btn btn-success"
                                               onClick={this.onLoginClick}>Войти</a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12 control">
                                            <div className="border-top pt-3">
                                                Не имеете аккаунт?
                                                <NavLink to="/registration" className="navlink reg"> Зарегистрироваться
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}

export default Authorization;