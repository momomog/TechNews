import React from 'react';
import {connect} from "react-redux";
import App from "./App";
import {getCurrentUserData, setIsAuthAction} from "../redux/UserReducer";
import AuthService from "../common/AuthService";

class AppWrapper extends React.Component {

    componentDidMount() {
        if (AuthService.isAuth()) {
            this.props.setIsAuth(true)
            const userId = AuthService.getUserId()

            if (userId)
                this.props.getUserData(userId)
        }
    }

    render() {
        return <App/>
    }
}

let mapStateToProps = (state) => {
    return {}
}

let mapDispatchToProps = (dispatch) => {
    return {
        setIsAuth: isAuth => dispatch(setIsAuthAction(isAuth)),
        getUserData: () => dispatch(getCurrentUserData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper)