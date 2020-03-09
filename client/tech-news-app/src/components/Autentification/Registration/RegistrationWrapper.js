import React from 'react';
import {connect} from "react-redux";
import Registration from "./Registration";
import {signup} from "../../../redux/UserReducer";

class RegistrationWrapper extends React.Component {

    signup = (signupRequest) => {
        this.props.signup(signupRequest);
    };

    render() {
        return (
            <Registration signup={this.signup}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        signup: signupRequest => dispatch(signup(signupRequest))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationWrapper);