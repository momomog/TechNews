import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import {getCurrentUserData} from "../../../redux/AuthReducer";
import ProfileEdit from "./ProfileEdit";

class ProfileEditWrapper extends React.Component {


    render() {
        if (this.props.isAuth) {
            return <ProfileEdit currentUser={this.props.currentUserData}/>
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
        getCurrentUserData: userId => dispatch(getCurrentUserData(userId))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProfileEditWrapper);