import React from 'react'
import LoginReduxForm from './LoginForm'
import {SignInRequest} from '../../../../models/RequestsModel'

interface Props {
    onLogin: (request: SignInRequest, remember?: boolean) => void
}

/**
 * Авторизация
 * @param onLogin
 */
const Authorization: React.FC<Props> = ({onLogin}) => {

    const onLoginClick = ({usernameOrEmail, password, remember}: SignInRequest) => {
        onLogin({
            usernameOrEmail,
            password
        }, remember)
    }

    return (
        <div className="container">
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