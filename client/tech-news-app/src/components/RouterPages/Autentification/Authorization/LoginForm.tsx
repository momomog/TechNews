import {NavLink} from "react-router-dom";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../../../common/FormControls/Input";
import {required} from "../../../../common/Validators";
import {SignInRequest} from "../../../../models/RequestsModel";

/**
 *
 * @param handleSubmit
 * @param invalid
 * Форма авторизации
 */
const LoginForm: React.FC<InjectedFormProps<SignInRequest>> = ({handleSubmit, invalid}) => {

    return (
        <form className="form-horizontal"
              onSubmit={handleSubmit}>

            <div className="input-group mb-3">
                <span className="input-group-addon">
                     <i className="glyphicon glyphicon-user"/>
                </span>
                <Field component={Input}
                       validate={required}
                       className="input-group-form"
                       showlabel={'true'}
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
                       showlabel={'true'}
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
                            disabled={invalid}>
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

export default reduxForm<SignInRequest>({
    form: 'login'
})(LoginForm)