import {NavLink} from "react-router-dom";
import React, {useEffect} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../../../common/Validators";
import ProfileField from "./ProfileField";
import Common from "../../../../../common/Common";
import {DatePicker} from "../../../../../common/FormControls/DatePicker";
import {ProfileRequest} from "../../../../../models/RequestsModel";
import {User} from "../../../../../models/UserModel";

interface OwnProps {
    user: User
}

/**
 * Редактор профиля. Форма
 * @param user
 * @param initialize
 * @param handleSubmit
 * @param invalid
 * @param submitSucceeded
 */
const ProfileEditForm: React.FC<InjectedFormProps<ProfileRequest, OwnProps> & OwnProps> = ({user, initialize, handleSubmit, invalid, submitSucceeded}) => {

    useEffect(() => {
        initialize({
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
    }, [user, initialize])

    return (
        <form onSubmit={handleSubmit}>
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
                                   initValue={Common.intArrayToDate(user.profileData.birthDate)}
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
                                    disabled={submitSucceeded}>
                                Вернуться в профиль
                            </button>
                        </NavLink>
                        <button type="submit" className="btn btn-success"
                                disabled={invalid || submitSucceeded}>
                            {submitSucceeded ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default reduxForm<ProfileRequest, OwnProps>({
    form: 'profile'
})(ProfileEditForm)