import React from "react";
import {Field, reduxForm} from "redux-form";
import {
    email,
    isSamePasswords,
    minLength3,
    minLength6,
    required,
    usernameEmailValidate,
} from "../../../common/Validators";
import {Input} from "../../../common/FormControls/Input";

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
                           type="text"
                           component={Input}
                           validate={[required, minLength3]}
                           className="form-control input-group-form"
                           placeholder="Имя"/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field name="lastName"
                           placeholder="Фамилия"
                           component={Input}
                           validate={[required, minLength3]}
                           className="form-control input-group-form"/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field name="username"
                           component={Input}
                           placeholder="Никнейм"
                           validate={[required, minLength3]}
                           className="form-control input-group-form"/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field type="email"
                           component={Input}
                           name="email"
                           placeholder="Почта"
                           validate={[required, email]}
                           className="form-control input-group-form"/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field type="password"
                           component={Input}
                           name="password"
                           placeholder="Пароль"
                           validate={[required, minLength6]}
                           className="form-control input-group-form"/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 ">
                    <Field type="password"
                           component={Input}
                           name="repeatPassword"
                           placeholder="Повторите пароль"
                           validate={[required, minLength6, isSamePasswords]}
                           className="form-control input-group-form"/>
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