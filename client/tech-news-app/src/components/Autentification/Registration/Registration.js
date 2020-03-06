import React from "react";
import {Redirect} from "react-router-dom";
import RegistrationReduxForm from "./RegistrationForm/RegistrationForm";

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
            isSamePasswords: true,
        }
    }


    onRegistrationClick = (formData) => {
        debugger
        // e.preventDefault();
        if (this.state.password !== this.state.repeatPassword) {
            this.setState({'isSamePasswords': false});
            return;
        }

            // this.props.signup({
            //     firstName: this.state.firstName,
            //     lastName: this.state.lastName,
            //     username: this.state.userName,
            //     email: this.state.email,
            //     password: this.state.password
            // });
    };

    validateUsernameAvailability = () => {
        this.props.checkUsernameAvailability(this.state.userName);
    };

    validateEmailAvailability = () => {
        this.props.checkEmailAvailability(this.state.email);
    };

    onPasswordFieldClear = () => {
        this.setState({'isSamePasswords': true});
    };

    render() {
        return (
            this.props.isAuth
                ? <Redirect to="profile"/>
                : <div className="container">
                    <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 mt-5">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <div className="panel-title">Регистрация</div>
                            </div>

                            <div className="panel-body pt-5">
                                <RegistrationReduxForm onSubmit={this.onRegistrationClick}/>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Registration;