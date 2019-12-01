import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import {getCurrentUserData, getUserData, onLoadPhoto} from "../../../redux/ProfileReducer";
import Profile from "./Profile";
import Common from "../../../common/Common";

class ProfileWrapper extends React.Component {

    isNotCurrentUser() {
        const path = this.props.location.pathname.split('/');
        if ((path[1] === 'profile' && path.length === 2) || (path[1] === 'profile' && this.props.currentUserData.username === path[2]))
            return false;
        return true;
    }


    componentDidMount() {
        const path = this.props.location.pathname.split('/');
        if (this.isNotCurrentUser()) {
            this.props.getUserData(path[2]);
        }

        let user = Common.decodeJWTToken();
        if (user && user.sub)
            this.props.getCurrentUserData(user.sub);
    }

    render() {
        if (this.props.isAuth) {
            return <Profile currentUser={this.props.currentUserData}
                            user={this.props.userData}
                            isNotCurrentUser={this.isNotCurrentUser()}
                            onLoadPhoto={this.props.onLoadPhoto}/>
        }

        return <Redirect to="/authorization"/>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authData.isAuth,
        currentUserData: state.profileData.currentUserData,
        userData: state.profileData.userData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onLoadPhoto: photoBody => dispatch(onLoadPhoto(photoBody)),
        getCurrentUserData: userId => dispatch(getCurrentUserData(userId)),
        getUserData: username => dispatch(getUserData(username))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProfileWrapper);