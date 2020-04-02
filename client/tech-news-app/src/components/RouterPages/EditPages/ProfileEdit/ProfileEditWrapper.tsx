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
    userData: User
}

/**
 *
 * @param isAuth
 * @param userData
 * @param history
 * Оболочка Редактор профиля
 */
const ProfileEditWrapper: React.FC<RouteComponentProps<any> & Props> = ({isAuth, userData, history}) => {

    const updateUserData = (userDataRequest: ProfileRequest) => {
        ProfileAPI.onUpdateUserData(userDataRequest)
            .then(() => {
                history.push('/profile')
                NotificationManager.success('Ваши данные успешно обновлены', 'Успешно')
            })
            .catch(() => NotificationManager.error('Не удалось обновить данные профиля', 'Ошибка'))
    }

    if (isAuth)
        return <ProfileEdit user={userData}
                            updateUserData={updateUserData}/>
    else
        return <Redirect to="/authorization"/>

}

let mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.userData.isAuth,
        userData: state.userData.userData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileEditWrapper))