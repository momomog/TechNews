import React from 'react';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import Profile from "./Profile";
import ProfileAPI from "../../../api/ProfileAPI";
import {getCurrentUserData, getUserData} from "../../../redux/UserReducer";
import AuthService from "../../../common/AuthService";
import {User} from "../../../models/UserModel";
import {RouteComponentProps} from "react-router";
import {RootState} from "../../../redux/ReduxStore";
import Spinner from "../../core/Spinner";

interface Props {
    isAuth: boolean
    currentUserData: User
    userData: User
    getCurrentUserData: () => void
    getUserData: (username: string) => void
}

class ProfileWrapper extends React.Component<RouteComponentProps<any> & Props> {

    isNotCurrentUser() {
        const path = this.props.location.pathname.split('/');
        return !((path[1] === 'profile' && path.length === 2)
            || (path[1] === 'profile' && this.props.currentUserData && this.props.currentUserData.username === path[2]))

    }

    updateUserPhoto = (body) => {
        ProfileAPI.onLoadPhoto(body).then(() => {
            this.props.getCurrentUserData()
        })
    }

    componentDidMount() {
        if (this.isNotCurrentUser()) {
            const path = this.props.location.pathname.split('/');
            this.props.getUserData(path[2])
        } else if (AuthService.isAuth())
            this.props.getCurrentUserData()
    }

    render() {
        if (this.props.isAuth) {
            if (this.props.currentUserData.id || this.props.userData.id)
                return <Profile currentUser={this.props.currentUserData}
                                notCurrentUser={this.props.userData}
                                isNotCurrentUser={this.isNotCurrentUser()}
                                onLoadPhoto={this.updateUserPhoto}/>
            else
                return <Spinner/>

        }

        return <Redirect to="/authorization"/>
    }
}

let mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.userData.isAuth,
        currentUserData: state.userData.currentUserData,
        userData: state.userData.userData
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getCurrentUserData: () => dispatch(getCurrentUserData()),
        getUserData: username => dispatch(getUserData(username))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper))