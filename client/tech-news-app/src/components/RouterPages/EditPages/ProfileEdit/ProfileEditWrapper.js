import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import ProfileEdit from "./ProfileEdit";
import Common from "../../../../common/Common";
import ProfileAPI from "../../../../api/ProfileAPI";
import {NotificationManager} from "react-notifications";

class ProfileEditWrapper extends React.Component {

    updateUserData = (userDataRequest) => {
        const me = this;

        ProfileAPI.onUpdateUserData(userDataRequest)
            .then(response => {
                me.props.history.push('/profile')
                NotificationManager.success('Ваши данные успешно обновлены', 'Успешно');
            })
            .catch(function (error) {
                NotificationManager.error('Не удалось обновить данные профиля', 'Ошибка');
            })
    }

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
        isAuth: state.userData.isAuth,
        currentUserData: state.userData.currentUserData,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {}
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProfileEditWrapper);