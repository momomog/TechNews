import 'date-fns';
import React from 'react';
import "moment/locale/ru";
import ProfileEditReduxForm from "./ProfileEditForm/ProfileEditForm";

class ProfileEdit extends React.Component {

    updateProfileData = (formData) => {
        this.props.updateUserData(formData);
    };

    render() {
        return this.props.currentUser &&
            <div className="row">
                <div className="col-md-11 center-block ">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h4>Редактирование профиля</h4></div>

                        <ProfileEditReduxForm user={this.props.currentUser}
                                              onSubmit={this.updateProfileData}/>

                    </div>
                </div>
            </div>
    }
}

export default ProfileEdit;