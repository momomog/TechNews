import React from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import ProfileEdit from "./ProfileEdit";
import ProfileAPI from "../../../../api/ProfileAPI";
import {NotificationManager} from "react-notifications";
import {User} from "../../../../models/UserModel";
import {RootState} from "../../../../redux/ReduxStore";
import {RouteComponentProps} from "react-router";
import {ProfileRequest} from "../../../../models/RequestsModel";

interface Props {
    isAuth: boolean
    currentUserData: User
}

/**
 *
 * @param isAuth
 * @param currentUserData
 * @param history
 * Оболочка Редактор профиля
 */
const ProfileEditWrapper: React.FC<RouteComponentProps<any> & Props> = ({isAuth, currentUserData, history}) => {

    const updateUserData = (userDataRequest: ProfileRequest) => {
        ProfileAPI.onUpdateUserData(userDataRequest)
            .then(() => {
                history.push('/profile')
                NotificationManager.success('Ваши данные успешно обновлены', 'Успешно')
            })
            .catch(() => NotificationManager.error('Не удалось обновить данные профиля', 'Ошибка'))
    }

    if (isAuth)
        return <ProfileEdit user={currentUserData}
                            updateUserData={updateUserData}/>
    else
        return <Redirect to="/authorization"/>

}

let mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.userData.isAuth,
        currentUserData: state.userData.currentUserData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileEditWrapper))