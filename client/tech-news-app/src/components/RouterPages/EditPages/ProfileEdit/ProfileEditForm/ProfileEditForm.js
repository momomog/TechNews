import {NavLink} from "react-router-dom";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../../../common/Validators";
import ProfileField from "./ProfileField";
import Common from "../../../../../common/Common";
import {DatePicker} from "../../../../../common/FormControls/DatePicker";


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
        })
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
                        <div className="col-sm-2"/>
                    </div>

                    <div className="row p-2 ml-4">
                        <ProfileField label={'facebook.com/'}
                                      isSocial={true}
                                      name={'facebook'}/>

                        <ProfileField label={'twitter.com/'}
                                      isSocial={true}
                                      name={'twitter'}/>
                        <div className="col-sm-2"/>
                    </div>


                    <h5 className="card-header w-100">Основная информация</h5>
                    <div className="row p-2 ml-4">
                        <ProfileField label={'Фамилия'}
                                      validators={required}
                                      name={'lastName'}/>

                        <ProfileField label={'Имя'}
                                      validators={required}
                                      name={'firstName'}/>
                        <div className="col-sm-2"/>
                    </div>

                    <div className="row p-2 ml-4">
                        <ProfileField label={'Страна'}
                                      name={'country'}/>

                        <ProfileField label={'Город'}
                                      name={'city'}/>
                        <div className="col-sm-2"/>
                    </div>

                    <div className="row p-2 ml-4">
                        <div className="col-sm-5 d-flex justify-content-end">
                            <div className="w-50 d-flex justify-content-end">
                                <span className="mr-2 soc-date-name">Дата рождения</span>
                            </div>
                            <div className="w-50">
                                <Field component={DatePicker}
                                       initValue={Common.intArrayToDate(this.props.user.profileData.birthDate)}
                                       className="soc-input w-100"
                                       label={'Дата рождения'}
                                       name={'birthday'}/>
                            </div>
                        </div>
                        <div className="col-sm-7"/>
                    </div>

                    <div className="row p-2 ml-4">
                        <div className="col-sm-12 mt-5 d-flex justify-content-end">
                            <NavLink to="/profile">
                                <button type="button"
                                        className="btn btn-light mr-3"
                                        disabled={this.props.submitSucceeded}>
                                    Вернуться в профиль
                                </button>
                            </NavLink>
                            <button type="submit" className="btn btn-success"
                                    disabled={this.props.invalid || this.props.submitSucceeded}>
                                {this.props.submitSucceeded ? 'Сохранение...' : 'Сохранить'}
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