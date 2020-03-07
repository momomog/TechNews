import {NavLink} from "react-router-dom";
import React from "react";
import {Field, reduxForm} from "redux-form";

export const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

function LoginForm(props) {
    return (
        <form className="form-horizontal"
              onSubmit={props.handleSubmit}>

            <div className="input-group mb-3">
                <span className="input-group-addon">
                     <i className="glyphicon glyphicon-user"/>
                </span>
                <Field component={'input'}
                       className="input-group-form"
                       name="usernameOrEmail"
                       placeholder="имя пользователя или почта" required/>
            </div>

            <div className="input-group mb-2">
                <span className="input-group-addon">
                     <i className="glyphicon glyphicon-lock"/>
                </span>
                <Field component={'input'}
                       type="password"
                       className="input-group-form"
                       name="password"
                       placeholder="пароль" required/>
            </div>

            <div className="input-group">
                <div className="checkbox input-group-checkbox mt-2">
                    <label>
                        <Field component={'input'}
                               type="checkbox"
                               name="remember"/>
                        Запомнить
                    </label>
                </div>
            </div>

            <div className="form-group mt-2">
                <div className="col-sm-12">
                    <button className="btn btn-success">Войти</button>
                </div>
            </div>

            <div className="form-group">
                <div className="col-md-12 control">
                    <div className="border-top pt-3">
                        Не имеете аккаунт?&nbsp;
                        <NavLink to="/registration" className="navlink reg">
                            Зарегистрироваться
                        </NavLink>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default LoginReduxForm