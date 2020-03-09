import {NavLink} from "react-router-dom";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../../common/FormControls/Input";
import {required} from "../../../../common/Validators";

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
                <Field component={Input}
                       validate={required}
                       className="input-group-form"
                       showLabel={true}
                       placeholder="Имя пользователя или почтовый адрес"
                       name="usernameOrEmail"/>
            </div>

            <div className="input-group mb-2">
                <span className="input-group-addon">
                     <i className="glyphicon glyphicon-lock"/>
                </span>
                <Field component={Input}
                       validate={required}
                       type="password"
                       className="input-group-form"
                       name="password"
                       showLabel={true}
                       placeholder="пароль"/>
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
                    <button className="btn btn-success"
                            disabled={props.invalid || props.submitting}>
                        Войти
                    </button>
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