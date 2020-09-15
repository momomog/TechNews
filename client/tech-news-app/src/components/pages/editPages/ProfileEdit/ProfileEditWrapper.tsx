import React from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import ProfileEdit from './ProfileEdit'
import ProfileAPI from '../../../../api/ProfileAPI'
import {NotificationManager} from 'react-notifications'
import {ProfileRequest} from '../../../../models/RequestsModel'
import {getCurrentUserData} from '../../../../redux/actions/userActions'


/**
 * Редактор профиля. Оболочка
 */
const ProfileEditWrapper: React.FC = () => {
    const history = useHistory(),
        dispatch = useDispatch()

    const updateUserData = async (userDataRequest: ProfileRequest) => {
        try {
            await ProfileAPI.onUpdateUserData(userDataRequest)
            dispatch(getCurrentUserData())
            history.push('/profile')
            NotificationManager.success('Ваши данные успешно обновлены', 'Успешно')
        } catch (e) {
            NotificationManager.error('Не удалось обновить данные профиля', 'Ошибка')
        }
    }

    return <ProfileEdit updateUserData={updateUserData}/>
}


export default ProfileEditWrapper