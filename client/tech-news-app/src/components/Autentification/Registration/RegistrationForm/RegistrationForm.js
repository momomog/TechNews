import React from "react";
import {Field, reduxForm} from "redux-form";
import {usernameAvailabilityValidate} from "../../../../common/Validators";

export const RegistrationReduxForm = reduxForm({
    form: 'registration',
    usernameAvailabilityValidate,
    asyncBlurFields: ['userName']
})(RegistrationForm)

function RegistrationForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>

            <div className="row">
                <div className="col-12">
                    <label
                        className="col-sm-3 control-label required-field reg-label required-field">
                        Имя
                    </label>
                </div>
                <div className="col-12">
                    <div className="col-sm-12 mw-100">
                        <Field name="firstName"
                               component={'input'}
                               className="form-control input-group-form"
                               placeholder="Имя" required/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <label className="col-sm-3 control-label required-field reg-label required-field">
                        Фамилия
                    </label>
                </div>
                <div className="col-12">
                    <div className="col-sm-12 mw-100">
                        <Field name="lastName" placeholder="Фамилия"
                               component={'input'}
                               className="form-control input-group-form" required/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <label className="col-sm-3 control-label required-field reg-label required-field">
                        Никнейм
                    </label>
                </div>
                <div className="col-12">
                    <div className="col-sm-12 mw-100">
                        <Field name="userName" placeholder="Никнейм" minLength="3"
                               component={'input'}
                            // onBlur={this.validateUsernameAvailability}
                               className="form-control input-group-form" required/>
                    </div>
                </div>

                {
                    !props.isUsernameAvailability
                        ? <div className="col-12">
                            <div className="col-sm-12">
                                <div className="text-danger text-center">
                                    Данный никнейм уже зарегистрирован
                                </div>
                            </div>
                        </div>
                        : ''
                }

            </div>

            <div className="row">
                <div className="col-12">
                    <label
                        className="col-sm-3 control-label required-field reg-label required-field">
                        Почта
                    </label>
                </div>
                <div className="col-12">
                    <div className="col-sm-12 mw-100">
                        <Field type="email" name="email" placeholder="Почта"
                               component={'input'}
                            // onBlur={this.validateEmailAvailability}
                               className="form-control input-group-form" required/>
                    </div>
                </div>

                {
                    !props.isEmailAvailability
                        ? <div className="col-12">
                            <div className="col-sm-12">
                                <div className="text-danger text-center">
                                    Данный почтовый адрес уже зарегистрирован
                                </div>
                            </div>
                        </div>
                        : ''
                }

            </div>

            <div className="row">
                <div className="col-12">
                    <label className="col-sm-3 control-label reg-label required-field">
                        Пароль
                    </label>
                </div>
                <div className="col-12">
                    <div className="col-sm-12 mw-100">
                        <Field type="password" name="password" placeholder="Пароль" minLength="6"
                               component={'input'}
                            // onClick={this.onPasswordFieldClear}
                               className="form-control input-group-form" required/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <label className="col-sm-6 control-label reg-label required-field">
                        Повторите пароль
                    </label>
                </div>
                <div className="col-12">
                    <div className="col-sm-12 mw-100">
                        <Field type="password" name="repeatPassword" placeholder="Повторите пароль"
                               component={'input'}
                               minLength="6"
                            // onClick={this.onPasswordFieldClear}
                               className="form-control input-group-form"
                               required/>
                    </div>
                </div>

                {/*{*/}
                {/*    !this.state.isSamePasswords*/}
                {/*        ? <div className="col-12">*/}
                {/*            <div className="col-sm-12">*/}
                {/*                <div className="text-danger text-center">*/}
                {/*                    Введенные пароли не совпадают*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        : ''*/}
                {/*}*/}

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