import React from 'react'
import {connect} from 'react-redux'
import Registration from './Registration'
import AuthAPI from '../../../../api/AuthAPI'
import {NotificationManager} from 'react-notifications'
import {SignUpRequest} from '../../../../models/RequestsModel'
import {RootState} from '../../../../redux/ReduxStore'
import {RouteComponentProps} from 'react-router'
import {withRouter} from 'react-router-dom'
import {ErrorResponse} from '../../../../models/ResponseModel'

interface Props {
    isAuth: boolean
}

/**
 *
 * @param isAuth
 * @param history
 * Оболочка Регистрация
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

let mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.userData.isAuth
    }
}
let mapDispatchToProps = (dispatch) => {
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationWrapper))