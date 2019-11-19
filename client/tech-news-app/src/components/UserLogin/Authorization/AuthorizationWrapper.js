import React from 'react';
import {connect} from "react-redux";
import {login, setErrorAuthCodeAction} from "../../../redux/HeaderReducer";
import Authorization from "./Authorization";

class AuthorizationWrapper extends React.Component {

    onLogin = (loginRequest) => {
        this.props.login(loginRequest);
    };

    render() {
        return (
            <Authorization isAuth={this.props.isAuth}
                           errorAuthCode={this.props.errorAuthCode}
                           isErrorAuth={this.props.isErrorAuth}
                           userData={this.props.userData}
                           onLogin={this.onLogin}
                           setErrorAuthCode={this.props.setErrorAuthCode}/>
        )
    }

}

let mapStateToProps = (state) => {
    return {
        isAuth: state.headerData.isAuth,
        errorAuthCode: state.headerData.errorAuthCode,
        isErrorAuth: state.headerData.isErrorAuth,
        userData: state.headerData.userData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        // setIsAuth: isAuth => dispatch(setIsAuthAction(isAuth)),
        login: loginRequest => dispatch(login(loginRequest)),
        setErrorAuthCode: code => dispatch(setErrorAuthCodeAction(code)),
        // setUserData: userData => dispatch(setUserDataAction(userData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWrapper);