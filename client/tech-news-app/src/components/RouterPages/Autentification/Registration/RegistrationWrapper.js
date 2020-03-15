import React from 'react';
import {connect} from "react-redux";
import Registration from "./Registration";
import {signup} from "../../../../redux/UserReducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import AuthAPI from "../../../../api/AuthAPI";
import {NotificationManager} from "react-notifications";
import Common from "../../../../common/Common";

class RegistrationWrapper extends React.Component {

    signup = (signupRequest) => {
        const me = this;

        AuthAPI.signup(signupRequest)
            .then(response => {
                NotificationManager.success('Для продолжения работы войдите на сайт', 'Вы успешно зарегистрировались');
                me.props.history.push('/authorization');
            })
            .catch(function (error) {
                NotificationManager.error('При попытке регистрации произошла неизвестная ошибка', 'Ошибка');
            })
    }

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
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(RegistrationWrapper);