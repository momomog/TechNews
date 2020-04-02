import React, {useEffect} from 'react';
import {connect} from "react-redux";
import App from "./App";
import AuthService from "../common/AuthService";
import {Dispatch} from "redux";
import {UserAction} from "../models/UserModel";
import {getCurrentUserData, setIsAuthAction} from "../redux/UserReducer";

interface Props {
    setIsAuth: (isAuth: boolean) => UserAction,
    getUserData: () => void
}

/**
 *
 * @param setIsAuth
 * @param getUserData
 * Оболочка для корневого компонента
 */
const AppWrapper: React.FC<Props> = ({setIsAuth, getUserData}) => {
    useEffect(() => {
        if (AuthService.isAuth()) {
            setIsAuth(true)
            getUserData()
        }
    }, [])

    return <App/>
}

let mapStateToProps = (state) => {
    return {}
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setIsAuth: (isAuth: boolean) => dispatch(setIsAuthAction(isAuth)),
        getUserData: () => dispatch(getCurrentUserData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper)