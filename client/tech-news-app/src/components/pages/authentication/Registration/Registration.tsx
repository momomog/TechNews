import React from 'react'
import RegistrationReduxForm from './RegistrationForm'
import {SignUpRequest} from '../../../../models/RequestsModel'

interface Props {
    signup: (request: SignUpRequest) => void
}

/**
 * Регистрация
 */
const Registration: React.FC<Props> = ({signup}: Props) => {

    const onRegistrationClick = (formData: SignUpRequest) => {
        signup({
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password
        })
    }

    return (
        <div className="container reg-form">
            <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">Регистрация</div>
                    </div>

                    <div className="panel-body pt-2">
                        <RegistrationReduxForm onSubmit={onRegistrationClick}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration
