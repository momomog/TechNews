import React from 'react';
import {setIsAuthAction, setUserDataAction} from "../../../redux/HeaderReducer";
import {connect} from "react-redux";
import Login from "./Login";

class LoginWrapper extends React.Component {



    render() {
        return (
            <Login isAuth={this.props.isAuth}
                   userData={this.props.userData}
                   setIsAuth={this.props.setIsAuth}
                   setUserData={this.props.setUserData}/>
        )
    }

}

let mapStateToProps = (state) => {
    return {
        isAuth: state.headerData.isAuth,
        userData: state.headerData.userData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setIsAuth: isAuth => dispatch(setIsAuthAction(isAuth)),
        setUserData: userData => dispatch(setUserDataAction(userData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginWrapper);