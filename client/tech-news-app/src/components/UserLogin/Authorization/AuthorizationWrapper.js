import React from 'react';
import {connect} from "react-redux";
import {login, setAuthErrorCodeAction} from "../../../redux/AuthReducer";
import Authorization from "./Authorization";

class AuthorizationWrapper extends React.Component {

    onLogin = (loginRequest) => {
        this.props.login(loginRequest);
    };

    render() {
        return (
            <Authorization isAuth={this.props.isAuth}
                           authErrorCode={this.props.authErrorCode}
                           isErrorAuth={this.props.isErrorAuth}
                           userData={this.props.userData}
                           onLogin={this.onLogin}
                           setAuthErrorCode={this.props.setAuthErrorCode}/>
        )
    }

}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authData.isAuth,
        authErrorCode: state.authData.authErrorCode,
        isErrorAuth: state.authData.isErrorAuth,
        userData: state.authData.userData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        // setIsAuth: isAuth => dispatch(setIsAuthAction(isAuth)),
        login: loginRequest => dispatch(login(loginRequest)),
        setAuthErrorCode: code => dispatch(setAuthErrorCodeAction(code)),
        // setUserData: userData => dispatch(setUserDataAction(userData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWrapper);