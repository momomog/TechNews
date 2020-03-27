import React from 'react';
import {connect} from "react-redux";
import App from "./App";
import AuthService from "../common/AuthService";
import {Dispatch} from "redux";
import {UserAction} from "../models/UserModel";
import {getCurrentUserData, setIsAuthAction} from "../redux/UserReducer";

interface Props {
    setIsAuth: (isAuth:boolean) => UserAction,
    getUserData: () => any
}

/**
 * Оболочка для корневого компонента
 */
class AppWrapper extends React.Component<Props> {
    componentDidMount() {
        if (AuthService.isAuth()) {
            this.props.setIsAuth(true)
            this.props.getUserData()
        }
    }

    render() {
        return <App/>
    }
}

let mapStateToProps = (state) => {
    return {}
}

let mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        setIsAuth: (isAuth: boolean) => dispatch(setIsAuthAction(isAuth)),
        getUserData: () => dispatch(getCurrentUserData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper)