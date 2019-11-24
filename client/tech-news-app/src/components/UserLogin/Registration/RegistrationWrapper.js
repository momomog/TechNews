import React from 'react';
import {connect} from "react-redux";
import Registration from "./Registration";
import {checkUsernameAvailability, login} from "../../../redux/AuthReducer";

class RegistrationWrapper extends React.Component {

    render() {
        return (
            <Registration isUsernameAvailability={this.props.isUsernameAvailability}
                          checkUsernameAvailability={this.props.checkUsernameAvailability}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authData.isAuth,
        userData: state.authData.userData,
        isUsernameAvailability: state.authData.isUsernameAvailability,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        login: loginRequest => dispatch(login(loginRequest)),
        checkUsernameAvailability: userName => dispatch(checkUsernameAvailability(userName)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationWrapper);