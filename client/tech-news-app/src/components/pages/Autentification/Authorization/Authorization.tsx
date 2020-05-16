import React from "react";
import {Redirect} from "react-router-dom";
import LoginReduxForm from "./LoginForm";
import {SignInRequest} from "../../../../models/RequestsModel";

interface Props {
    isAuth: boolean
    onLogin: (request: SignInRequest, remember?: boolean) => void
}

/**
 * Авторизация
 * @param isAuth
 * @param onLogin
 */
const Authorization: React.FC<Props> = ({isAuth, onLogin}) => {

    const onLoginClick = (formData: SignInRequest) => {
        onLogin({
            usernameOrEmail: formData.usernameOrEmail,
            password: formData.password
        }, formData.remember)
    }

    return (
        isAuth
            ? <Redirect to="profile"/>
            : <div className="container">
                <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 mt-5">
                    <div className="panel panel-info">

                        <div className="panel-heading">
                            <div className="panel-title">Войти</div>
                        </div>

                        <div className="panel-body pt-5">
                            <LoginReduxForm onSubmit={onLoginClick}/>
                        </div>

                    </div>
                </div>
            </div>
    )
}

export default Authorization