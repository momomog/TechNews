import React from "react";
import {NavLink, Redirect} from "react-router-dom";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            repeatPassword: '',
            isUserNameAvailability: this.props.isUsernameAvailability,
            isEmailNameAvailability: true,
            isSamePasswords: true,
        };
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        // this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        // this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    validateUsernameAvailability = () => {
        this.props.checkUsernameAvailability(this.state.userName);
    };

    onFieldsChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            this.props.isAuth
                ? <Redirect to="profile"/>
                : <div className="container">
                    <div id="loginbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 mt-5">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <div className="panel-title">Регистрация</div>
                            </div>

                            <div className="panel-body pt-5">
                                <form role="form" id="updateProfileForm" method="post">
                                    <div className="row">
                                        <div className="col-12">
                                            <label
                                                className="col-sm-3 control-label required-field reg-label required-field">
                                                Имя
                                            </label>
                                        </div>
                                        <div className="col-12">
                                            <div className="col-sm-12 mw-100">
                                                <input type="text" placeholder="Имя"
                                                       onChange={this.onFieldsChange}
                                                       className="form-control input-group-form" name="firstName" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <label
                                                className="col-sm-3 control-label required-field reg-label required-field">
                                                Фамилия
                                            </label>
                                        </div>
                                        <div className="col-12">
                                            <div className="col-sm-12 mw-100">
                                                <input type="text" placeholder="Фамилия"
                                                       onChange={this.onFieldsChange}
                                                       className="form-control input-group-form" name="lastName" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <label
                                                className="col-sm-3 control-label required-field reg-label required-field">
                                                Никнейм
                                            </label>
                                        </div>
                                        <div className="col-12">
                                            <div className="col-sm-12 mw-100">
                                                <input type="text" placeholder="Никнейм"
                                                       onChange={this.onFieldsChange}
                                                       onBlur={this.validateUsernameAvailability}
                                                       className="form-control input-group-form" name="userName" required/>
                                            </div>
                                        </div>

                                        {
                                            this.state.isUserNameAvailability
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
                                                <input type="email" placeholder="Почта"
                                                       onChange={this.onFieldsChange}
                                                       className="form-control input-group-form" name="email" required/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="col-sm-12">
                                                <div className="text-danger text-center">
                                                    Данный почтовый адрес уже зарегистрирован
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <label className="col-sm-3 control-label reg-label required-field">
                                                Пароль
                                            </label>
                                        </div>
                                        <div className="col-12">
                                            <div className="col-sm-12 mw-100">
                                                <input type="password" placeholder="Пароль"
                                                       onChange={this.onFieldsChange}
                                                       className="form-control input-group-form" name="password" required/>
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
                                                <input type="password" placeholder="Повторите пароль"
                                                       onChange={this.onFieldsChange}
                                                       className="form-control input-group-form" name="repeatPassword"
                                                       required/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="col-sm-12">
                                                <div className="text-danger text-center">
                                                    Введенные пароли не совпадают
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group mt-3">
                                        <div className="col-sm-12">
                                            <input type="submit" className="btn btn-success btn-block w-auto"
                                                   value="Зарегистрировать"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Registration;