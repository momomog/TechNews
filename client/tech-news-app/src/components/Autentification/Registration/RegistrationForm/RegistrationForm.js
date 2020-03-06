import React from "react";
import {Field, reduxForm} from "redux-form";
import {email, minLength3, minLength6, required, usernameAvailabilityValidate} from "../../../../common/Validators";
import {Input} from "../../../../common/FormControls/Input";

export const RegistrationReduxForm = reduxForm({
    form: 'registration'
})(RegistrationForm)

function RegistrationForm(props) {
    return (
        <form onSubmit={props.handleSubmit} className="p-4">

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field name="firstName"
                           component={Input}
                           validate={required}
                           className="form-control input-group-form"
                           placeholder="Имя"/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field name="lastName"
                           placeholder="Фамилия"
                           component={Input}
                           validate={required}
                           className="form-control input-group-form"/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field name="userName"
                           component={Input}
                           placeholder="Никнейм"
                           validate={[required, minLength3, usernameAvailabilityValidate]}
                        // onBlur={this.validateUsernameAvailability}
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
                        // onBlur={this.validateEmailAvailability}
                           className="form-control input-group-form"/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 mw-100">
                    <Field type="password"
                           name="password"
                           placeholder="Пароль"
                           component={Input}
                        // onClick={this.onPasswordFieldClear}
                           validate={[required, minLength6]}
                           className="form-control input-group-form"/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12 ">
                    <Field type="password"
                           name="repeatPassword"
                           placeholder="Повторите пароль"
                           component={Input}
                        // onClick={this.onPasswordFieldClear}
                           validate={[required, minLength6]}
                           className="form-control input-group-form"/>
                </div>
            </div>

            <div className="form-group mt-3">
                <div className="col-sm-12">
                    <button className="btn btn-success btn-block w-auto"
                            value="Зарегистрировать">
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </form>
    )
}

export default RegistrationReduxForm