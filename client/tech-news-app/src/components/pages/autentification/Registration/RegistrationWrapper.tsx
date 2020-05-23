import React from 'react'
import {connect} from 'react-redux'
import Registration from './Registration'
import AuthAPI from '../../../../api/AuthAPI'
import {NotificationManager} from 'react-notifications'
import {SignUpRequest} from '../../../../models/RequestsModel'
import {RouteComponentProps} from 'react-router'
import {withRouter} from 'react-router-dom'
import {ErrorResponse} from '../../../../models/ResponseModel'
import {RootState} from '../../../../redux/reducers/rootReducer'

interface Props {
    isAuth: boolean
}

/**
 * Регистрация. Оболочка
 * @param isAuth
 * @param history
 */
const RegistrationWrapper: React.FC<RouteComponentProps<any> & Props> = ({isAuth, history}) => {

    const signup = (signupRequest: SignUpRequest) => {
        AuthAPI.signup(signupRequest)
            .then(() => {
                NotificationManager.success('Для продолжения работы войдите на сайт', 'Вы успешно зарегистрировались')
                history.push('/authorization')
            })
            .catch((error: ErrorResponse) => NotificationManager.error(error.message, 'Ошибка'))
    }

    return <Registration isAuth={isAuth}
                         signup={signup}/>
}

const mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.userData.isAuth
    }
}

export default withRouter(connect(mapStateToProps, null)(RegistrationWrapper))