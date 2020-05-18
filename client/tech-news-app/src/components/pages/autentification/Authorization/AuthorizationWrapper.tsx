import React from 'react'
import {connect} from 'react-redux'
import {login} from '../../../../redux/UserReducer'
import Authorization from './Authorization'
import {RootState} from '../../../../redux/ReduxStore'
import {Dispatch} from 'redux'
import {SignInRequest} from '../../../../models/RequestsModel'

interface Props {
    isAuth: boolean
    login: (request: SignInRequest, remember?: boolean) => void
}

/**
 * Авторизация. Оболочка
 * @param isAuth
 * @param login
 */
const AuthorizationWrapper: React.FC<Props> = ({isAuth, login}) => {

    const onLogin = (request: SignInRequest, remember?: boolean) => login(request, remember)

    return <Authorization isAuth={isAuth}
                          onLogin={onLogin}/>
}

let mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.userData.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        login: (request: SignInRequest, remember?: boolean) => dispatch(login(request, remember))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWrapper)