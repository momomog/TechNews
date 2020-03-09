import {NavLink} from "react-router-dom";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../../../common/Validators";
import ProfileField from "./ProfileField";
import Common from "../../../../../common/Common";
import {DateField} from "../../../../../common/FormControls/DateField";


class ProfileEditForm extends React.Component {

    componentWillMount() {
        let user = this.props.user;

        this.props.initialize({
            vk: user.profileData.vk,
            instagram: user.profileData.instagram,
            facebook: user.profileData.facebook,
            twitter: user.profileData.twitter,
            country: user.profileData.country,
            city: user.profileData.city,
            lastName: user.lastName,
            firstName: user.firstName,
            birthDate: Common.intArrayToDate(user.profileData.birthDate)
        });
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="panel-body">
                    <h5 className="card-header w-100">Ссылки на социальные сети</h5>

                    <div className="row p-2 ml-4">
                        <ProfileField label={'vk.com/'}
                                      isSocial={true}
                                      name={'vk'}/>

                        <ProfileField label={'instagram.com/'}
                                      isSocial={true}
                                      name={'instagram'}/>
                        <div className="col-xs-2"/>
                    </div>

                    <div className="row p-2 ml-4">
                        <ProfileField label={'facebook.com/'}
                                      isSocial={true}
                                      name={'facebook'}/>

                        <ProfileField label={'twitter.com/'}
                                      isSocial={true}
                                      name={'twitter'}/>
                        <div className="col-xs-2"/>
                    </div>


                    <h5 className="card-header w-100">Основная информация</h5>
                    <div className="row p-2 ml-4">
                        <ProfileField label={'Фамилия'}
                                      validators={required}
                                      name={'lastName'}/>

                        <ProfileField label={'Имя'}
                                      validators={required}
                                      name={'firstName'}/>
                        <div className="col-2xs-"/>
                    </div>

                    <div className="row p-2 ml-4">
                        <ProfileField label={'Страна'}
                                      name={'country'}/>

                        <ProfileField label={'Город'}
                                      name={'city'}/>
                        <div className="col-xs-2"/>
                    </div>

                    <div className="row p-2 ml-4">
                        <div className='col-xs-1'/>
                        <div className="col-xs-5 date-picker d-flex justify-content-end">
                            <span className="mr-2 soc-date-name">Дата рождения</span>
                            <Field component={DateField}
                                   initValue={Common.intArrayToDate(this.props.user.profileData.birthDate)}
                                   className="soc-input w-100"
                                   label={'Дата рождения'}
                                   name={'birthday'}/>
                        </div>
                        <div className="col-xs-6">
                        </div>
                    </div>

                    <div className="row p-2 ml-4">
                        <div className="col-xs-12 mt-5 d-flex justify-content-end">
                            <NavLink to="/profile">
                                <button type="button"
                                        className="btn btn-light mr-3">
                                    Вернуться в профиль
                                </button>
                            </NavLink>
                            <button type="submit" className="btn btn-success"
                                    disabled={this.props.errors}>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export const ProfileEditReduxForm = reduxForm({
    form: 'profile'
})(ProfileEditForm)

export default ProfileEditReduxForm