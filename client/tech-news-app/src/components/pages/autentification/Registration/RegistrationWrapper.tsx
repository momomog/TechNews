import React from 'react'
import Registration from './Registration'
import AuthAPI from '../../../../api/AuthAPI'
import {NotificationManager} from 'react-notifications'
import {SignUpRequest} from '../../../../models/RequestsModel'
import {useHistory} from 'react-router'
import {ErrorResponse} from '../../../../models/ResponseModel'


/**
 * Регистрация. Оболочка
 */
const RegistrationWrapper: React.FC = () => {
    const history = useHistory()

    const signup = (signupRequest: SignUpRequest) => {
        AuthAPI.signup(signupRequest)
            .then(() => {
                NotificationManager.success('Для продолжения работы войдите на сайт', 'Вы успешно зарегистрировались')
                history.push('/authorization')
            })
            .catch((error: ErrorResponse) => NotificationManager.error(error.message, 'Ошибка'))
    }

    return <Registration signup={signup}/>
}

export default RegistrationWrapper