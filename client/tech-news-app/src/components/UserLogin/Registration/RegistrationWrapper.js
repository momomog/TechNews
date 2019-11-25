import React from 'react';
import {connect} from "react-redux";
import Registration from "./Registration";
import {checkEmailAvailability, checkUsernameAvailability, signup} from "../../../redux/AuthReducer";

class RegistrationWrapper extends React.Component {

    signup = (signupRequest) => {
        this.props.signup(signupRequest);
    };

    render() {
        return (
            <Registration isUsernameAvailability={this.props.isUsernameAvailability}
                          isEmailAvailability={this.props.isEmailAvailability}
                          signup={this.signup}
                          checkUsernameAvailability={this.props.checkUsernameAvailability}
                          checkEmailAvailability={this.props.checkEmailAvailability}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isUsernameAvailability: state.authData.isUsernameAvailability,
        isEmailAvailability: state.authData.isEmailAvailability,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        signup: signupRequest => dispatch(signup(signupRequest)),
        checkUsernameAvailability: userName => dispatch(checkUsernameAvailability(userName)),
        checkEmailAvailability: email => dispatch(checkEmailAvailability(email))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationWrapper);