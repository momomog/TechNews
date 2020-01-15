import React from 'react';
import {connect} from "react-redux";
import {login} from "../../../redux/AuthReducer";
import Authorization from "./Authorization";

class AuthorizationWrapper extends React.Component {

    onLogin = (request) => {
        this.props.login(request);
    };

    render() {
        return (
            <Authorization isAuth={this.props.isAuth}
                           currentUserData={this.props.currentUserData}
                           onLogin={this.onLogin}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authData.isAuth,
        currentUserData: state.profileData.currentUserData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        login: request => dispatch(login(request))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWrapper);