import React from 'react'
import {ProfileRequest} from '../../../../models/RequestsModel'
import ProfileEditReduxForm from './ProfileEditForm/ProfileEditForm'
import {User} from '../../../../models/UserModel'

interface Props {
    user: User,
    updateUserData: (request: ProfileRequest) => void
}

/**
 *
 * @param user
 * @param updateUserData
 * Редактор профиля
 */
const ProfileEdit: React.FC<Props> = ({user, updateUserData}) => {

    const updateProfileData = (formData: ProfileRequest) => updateUserData(formData)

    return (
        <div className="row">
            <div className="col-md-11 center-block ">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4>Редактирование профиля</h4>
                    </div>

                    <ProfileEditReduxForm user={user}
                                          onSubmit={updateProfileData}/>

                </div>
            </div>
        </div>
    )
}

export default ProfileEdit