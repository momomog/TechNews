import React from 'react';
import {ProfileRequest} from "../../../../models/RequestsModel";
import ProfileEditReduxForm from "./ProfileEditForm/ProfileEditForm";
import {User} from "../../../../models/UserModel";

interface Props {
    currentUser: User,
    updateUserData: (request: ProfileRequest) => void
}

const ProfileEdit: React.FC<Props> = ({currentUser, updateUserData}) => {

    const updateProfileData = (formData: ProfileRequest) => updateUserData(formData)

    return currentUser
        ? <div className="row">
            <div className="col-md-11 center-block ">
                <div className="panel panel-default">
                    <div className="panel-heading"><h4>Редактирование профиля</h4></div>

                    <ProfileEditReduxForm user={currentUser}
                                          onSubmit={updateProfileData}/>

                </div>
            </div>
        </div>
        : <div/>
}

export default ProfileEdit