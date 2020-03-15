import React from "react";
import {Field, reduxForm} from "redux-form";
import {
    email,
    isSamePasswords,
    maxLength15,
    maxLength30,
    maxLength40,
    minLength3,
    minLength6,
    required,
    usernameEmailValidate,
} from "../../../../common/Validators";
import {Input} from "../../../../common/FormControls/Input";

export const RegistrationReduxForm = reduxForm({
    form: 'registration',
    asyncValidate: usernameEmailValidate,
    asyncBlurFields: ['username', 'email']
})(RegistrationForm)

function RegistrationForm(props) {
    return (
        <form onSubmit={props.handleSubmit} className="p-4">

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field name="firstName"
                           component={Input}
                           type="text"
                           className="form-control input-group-form"
                           placeholder="Имя"
                           validate={[
                               required,
                               minLength3,
                               maxLength30
                           ]}/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field name="lastName"
                           component={Input}
                           placeholder="Фамилия"
                           className="form-control input-group-form"
                           validate={[
                               required,
                               minLength3,
                               maxLength30
                           ]}/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field name="username"
                           component={Input}
                           placeholder="Никнейм"
                           className="form-control input-group-form"
                           validate={[
                               required,
                               minLength3,
                               maxLength15
                           ]}/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field type="email"
                           component={Input}
                           name="email"
                           placeholder="Почта"
                           className="form-control input-group-form"
                           validate={[
                               required,
                               email,
                               maxLength40
                           ]}/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field type="password"
                           component={Input}
                           name="password"
                           placeholder="Пароль"
                           className="form-control input-group-form"
                           validate={[
                               required,
                               minLength6,
                               maxLength30
                           ]}/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 ">
                    <Field type="password"
                           component={Input}
                           name="repeatPassword"
                           placeholder="Повторите пароль"
                           className="form-control input-group-form"
                           validate={[
                               required,
                               minLength6,
                               maxLength30,
                               isSamePasswords
                           ]}/>
                </div>
            </div>

            <div className="form-group mt-3">
                <div className="col-sm-12 pl-0">
                    <button className="btn btn-success btn-block w-auto"
                            disabled={props.invalid || props.submitting}
                            value="Зарегистрировать">
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </form>
    )
}

export default RegistrationReduxForm