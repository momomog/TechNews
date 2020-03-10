import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import Profile from "./Profile";
import ProfileAPI from "../../../api/ProfileAPI";
import {getCurrentUserData, getUserData} from "../../../redux/UserReducer";
import AuthService from "../../../common/AuthService";

class ProfileWrapper extends React.Component {
    isNotCurrentUser() {
        const path = this.props.location.pathname.split('/');
        if ((path[1] === 'profile' && path.length === 2) || (path[1] === 'profile' && this.props.currentUserData.username === path[2]))
            return false;
        return true;
    }

    updateUserPhoto(body) {
        ProfileAPI.onLoadPhoto(body)
    }

    componentDidMount() {
        if (this.isNotCurrentUser()) {
            const path = this.props.location.pathname.split('/');
            this.props.getUserData(path[2]);
        } else if (AuthService.isAuth())
            this.props.getCurrentUserData(AuthService.getUserId())
    }

    render() {
        if (this.props.isAuth) {
            return <Profile currentUser={this.props.currentUserData}
                            user={this.props.userData}
                            isNotCurrentUser={this.isNotCurrentUser()}
                            onLoadPhoto={this.updateUserPhoto}/>
        }

        return <Redirect to="/authorization"/>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.userData.isAuth,
        currentUserData: state.userData.currentUserData,
        userData: state.userData.userData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        getCurrentUserData: userId => dispatch(getCurrentUserData(userId)),
        getUserData: username => dispatch(getUserData(username))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProfileWrapper);