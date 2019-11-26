import React from 'react';
import {connect} from "react-redux";
import {getUserData, onLoadPhoto} from "../../../redux/AuthReducer";
import Profile from "./Profile";
import Common from "../../../common/Common";

class ProfileWrapper extends React.Component {

    componentDidMount() {
        let user = Common.decodeJWTToken();

        if (user && user.sub)
            this.props.getUserData(user.sub);
    }

    render() {
        return (
            <Profile user={this.props.userData}
                     onLoadPhoto={this.props.onLoadPhoto}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        // isAuth: state.authData.isAuth,
        userData: state.authData.userData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onLoadPhoto: photoBody => dispatch(onLoadPhoto(photoBody)),
        getUserData: userId => dispatch(getUserData(userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper);