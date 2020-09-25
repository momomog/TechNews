import React from 'react'
import {useDispatch} from 'react-redux'
import Authorization from './Authorization'
import {SignInRequest} from '../../../../models/RequestsModel'
import {login} from '../../../../redux/actions/userActions'
import {Dispatch} from "redux";


/**
 * Авторизация. Оболочка
 */
const AuthorizationWrapper: React.FC = () => {
    const dispatch: Dispatch = useDispatch()
    const onLogin = (request: SignInRequest, remember?: boolean) => dispatch(login(request, remember))

    return <Authorization onLogin={onLogin}/>
}

export default AuthorizationWrapper