import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import {getCurrentUserData, updateUserData} from "../../../redux/AuthReducer";
import ProfileEdit from "./ProfileEdit";

class ProfileEditWrapper extends React.Component {

    updateUserData = (userDataRequest) => {
        this.props.updateUserData(userDataRequest);
        setTimeout(function () {
            window.location = "/profile";
        }, 400);
    };

    render() {
        if (this.props.isAuth) {
            return <ProfileEdit currentUser={this.props.currentUserData}
                                updateUserData={this.updateUserData}/>
        }

        return <Redirect to="/authorization"/>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authData.isAuth,
        currentUserData: state.authData.currentUserData,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        getCurrentUserData: userId => dispatch(getCurrentUserData(userId)),
        updateUserData: userDataRequest => dispatch(updateUserData(userDataRequest)),
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProfileEditWrapper);