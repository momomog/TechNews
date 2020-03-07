import React from "react";
import {Redirect} from "react-router-dom";
import LoginReduxForm from "./LoginForm/LoginForm";


class Authorization extends React.Component {

    onLoginClick = (formData) => {
        debugger
        this.props.onLogin({
            usernameOrEmail: formData.usernameOrEmail,
            password: formData.password
        }, formData.remember);
    };

    render() {
        return (
            this.props.isAuth
                ? <Redirect to="profile"/>
                : <div className="container">
                    <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 mt-5">
                        <div className="panel panel-info">

                            <div className="panel-heading">
                                <div className="panel-title">Войти</div>
                            </div>

                            <div className="panel-body pt-5">
                                <LoginReduxForm onSubmit={this.onLoginClick}/>
                            </div>

                        </div>
                    </div>
                </div>
        )
    }
}

export default Authorization;