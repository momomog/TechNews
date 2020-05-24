import React from 'react'
import {connect} from 'react-redux'
import Authorization from './Authorization'
import {Dispatch} from 'redux'
import {SignInRequest} from '../../../../models/RequestsModel'
import {login} from '../../../../redux/actions/userActions'

interface Props {
    login: (request: SignInRequest, remember?: boolean) => void
}

/**
 * Авторизация. Оболочка
 * @param isAuth
 * @param login
 */
const AuthorizationWrapper: React.FC<Props> = ({login}) => {

    const onLogin = (request: SignInRequest, remember?: boolean) => login(request, remember)

    return <Authorization onLogin={onLogin}/>
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        login: (request: SignInRequest, remember?: boolean) => dispatch(login(request, remember))
    }
}

export default connect(null, mapDispatchToProps)(AuthorizationWrapper)