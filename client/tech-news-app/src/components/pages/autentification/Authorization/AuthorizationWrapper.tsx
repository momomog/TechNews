import React from 'react'
import {connect} from 'react-redux'
import Authorization from './Authorization'
import {Dispatch} from 'redux'
import {SignInRequest} from '../../../../models/RequestsModel'
import {login} from '../../../../redux/actions/userActions'
import {RootState} from '../../../../redux/reducers/rootReducer'

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

const mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.userData.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        login: (request: SignInRequest, remember?: boolean) => dispatch(login(request, remember))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWrapper)