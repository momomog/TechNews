import React from 'react';
import {connect} from "react-redux";
import Registration from "./Registration";
import {checkEmailAvailability, checkUsernameAvailability, login} from "../../../redux/AuthReducer";

class RegistrationWrapper extends React.Component {

    render() {
        return (
            <Registration isUsernameAvailability={this.props.isUsernameAvailability}
                          isEmailAvailability={this.props.isEmailAvailability}
                          checkUsernameAvailability={this.props.checkUsernameAvailability}
                          checkEmailAvailability={this.props.checkEmailAvailability}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authData.isAuth,
        userData: state.authData.userData,
        isUsernameAvailability: state.authData.isUsernameAvailability,
        isEmailAvailability: state.authData.isEmailAvailability,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        login: loginRequest => dispatch(login(loginRequest)),
        checkUsernameAvailability: userName => dispatch(checkUsernameAvailability(userName)),
        checkEmailAvailability: email => dispatch(checkEmailAvailability(email))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationWrapper);