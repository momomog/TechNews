import React, {useContext} from 'react'
import {ProfileRequest} from '../../../../models/RequestsModel'
import ProfileEditReduxForm from './ProfileEditForm/ProfileEditForm'
import {AppThemeContext, ThemeContext} from '../../../../context/ThemeContext'

interface Props {
    updateUserData: (request: ProfileRequest) => void
}

/**
 * Редактор профиля
 */
const ProfileEdit: React.FC<Props> = ({updateUserData}: Props) => {
    const {isLight}: AppThemeContext = useContext(ThemeContext)
    const cardClasses: Array<string> = ['panel', 'panel-default', isLight ? 'background-light' : 'background-dark']

    const updateProfileData = (formData: ProfileRequest) => updateUserData(formData)

    return (
        <div className="row">
            <div className="col-md-11 center-block profile-edit-wrapper">
                <div className={cardClasses.join(' ')}>
                    <div className="panel-heading">
                        <h4>Редактирование профиля</h4>
                    </div>

                    <ProfileEditReduxForm onSubmit={updateProfileData}/>

                </div>
            </div>
        </div>
    )
}

export default ProfileEdit
