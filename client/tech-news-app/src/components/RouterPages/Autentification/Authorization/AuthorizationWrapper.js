import React from 'react';
import {connect} from "react-redux";
import {login} from "../../../../redux/UserReducer";
import Authorization from "./Authorization";

class AuthorizationWrapper extends React.Component {

    onLogin = (request, remember) => {
        this.props.login(request, remember);
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
        isAuth: state.userData.isAuth,
        currentUserData: state.userData.currentUserData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        login: (request, remember) => dispatch(login(request, remember))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWrapper);