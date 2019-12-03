import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import ProfileEdit from "./ProfileEdit";
import Common from "../../../../common/Common";
import {updateUserData} from "../../../../redux/ProfileReducer";

class ProfileEditWrapper extends React.Component {

    updateUserData = (userDataRequest) => {
        this.props.updateUserData(userDataRequest);
        Common.changeLocation('/profile', 400);
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
        currentUserData: state.profileData.currentUserData,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        // getCurrentUserData: userId => dispatch(getCurrentUserData(userId)),
        updateUserData: userDataRequest => dispatch(updateUserData(userDataRequest)),
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProfileEditWrapper);