import React from 'react'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import ProfileEdit from './ProfileEdit'
import ProfileAPI from '../../../../api/ProfileAPI'
import {NotificationManager} from 'react-notifications'
import {User} from '../../../../models/UserModel'
import {RouteComponentProps} from 'react-router'
import {ProfileRequest} from '../../../../models/RequestsModel'
import {Dispatch} from 'redux'
import {getCurrentUserData} from '../../../../redux/actions/userActions'
import {RootState} from '../../../../redux/reducers/rootReducer'

interface Props {
    isAuth: boolean
    userData: User
    getCurrentUserData: () => void
}

/**
 * Редактор профиля. Оболочка
 * @param isAuth
 * @param userData
 * @param getCurrentUserData
 * @param history
 */
const ProfileEditWrapper: React.FC<RouteComponentProps<any> & Props> = ({isAuth, userData, getCurrentUserData, history}) => {

    const updateUserData = (userDataRequest: ProfileRequest) => {
        ProfileAPI.onUpdateUserData(userDataRequest)
            .then(() => {
                getCurrentUserData()
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

const mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.userData.isAuth,
        userData: state.userData.userData
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getCurrentUserData: () => dispatch(getCurrentUserData())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileEditWrapper))