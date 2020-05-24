import React from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import ProfileEdit from './ProfileEdit'
import ProfileAPI from '../../../../api/ProfileAPI'
import {NotificationManager} from 'react-notifications'
import {RouteComponentProps} from 'react-router'
import {ProfileRequest} from '../../../../models/RequestsModel'
import {Dispatch} from 'redux'
import {getCurrentUserData} from '../../../../redux/actions/userActions'

interface Props {
    getCurrentUserData: () => void
}

/**
 * Редактор профиля. Оболочка
 * @param getCurrentUserData
 */
const ProfileEditWrapper: React.FC<RouteComponentProps<any> & Props> = ({getCurrentUserData}) => {
    const history = useHistory()

    const updateUserData = (userDataRequest: ProfileRequest) => {
        ProfileAPI.onUpdateUserData(userDataRequest)
            .then(() => {
                getCurrentUserData()
                history.push('/profile')
                NotificationManager.success('Ваши данные успешно обновлены', 'Успешно')
            })
            .catch(() => NotificationManager.error('Не удалось обновить данные профиля', 'Ошибка'))
    }

    return <ProfileEdit updateUserData={updateUserData}/>

}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getCurrentUserData: () => dispatch(getCurrentUserData())
    }
}

export default connect(null, mapDispatchToProps)(ProfileEditWrapper)