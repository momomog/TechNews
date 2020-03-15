import React from "react";
import {Redirect} from "react-router-dom";
import RegistrationReduxForm from "./RegistrationForm";

class Registration extends React.Component {
    onRegistrationClick = (formData) => {
        this.props.signup({
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password
        });
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

                            <div className="panel-body pt-2">
                                <RegistrationReduxForm onSubmit={this.onRegistrationClick}/>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Registration;