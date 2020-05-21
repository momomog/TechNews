import {NavLink} from 'react-router-dom'
import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Input} from '../../../../common/FormControls/Input'
import {required} from '../../../../common/Validators'
import {SignInRequest} from '../../../../models/RequestsModel'

/**
 * Форма авторизации
 * @param handleSubmit
 * @param invalid
 */
const LoginForm: React.FC<InjectedFormProps<SignInRequest>> = ({handleSubmit, invalid}) => {
    return (
        <form className="form-horizontal"
              onSubmit={handleSubmit}>

            <div className="input-group mb-3">
                <span className="input-group-addon">
                     <i className="glyphicon glyphicon-user" style={{marginLeft: '-5px'}}/>
                </span>
                <span style={{width: '93%'}}>
                    <Field component={Input}
                           validate={required}
                           className="input-group-form"
                           placeholder="Имя пользователя или почтовый адрес"
                           name="usernameOrEmail"/>
                </span>
            </div>

            <div className="input-group mb-2">
                <span className="input-group-addon">
                     <i className="glyphicon glyphicon-lock" style={{marginLeft: '-5px'}}/>
                </span>
                <span style={{width: '93%'}}>
                     <Field component={Input}
                            validate={required}
                            type="password"
                            className="input-group-form"
                            name="password"
                            placeholder="пароль"/>
                </span>

            </div>

            <div className="input-group">
                <div className="checkbox input-group-checkbox mt-2">
                    <Field component={'input'}
                           type="checkbox"
                           name="remember"/>
                    Запомнить
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