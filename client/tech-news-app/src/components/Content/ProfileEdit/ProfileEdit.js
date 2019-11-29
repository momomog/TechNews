import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField";
import {NavLink} from "react-router-dom";
import Common from "../../../common/Common";

class ProfileEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vk: '',
            instagram: '',
            facebook: '',
            twitter: '',
            firstName: '',
            lastName: '',
            country: '',
            city: '',
            birthDate: '',
            isSetState: false
        }
    }

    onFieldsChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onInitState = () => {
        if (!this.props.currentUser || this.state.isSetState)
            return;
        let user = this.props.currentUser;

        this.setState({
            vk: user.profileData.vk,
            instagram: user.profileData.instagram,
            facebook: user.profileData.facebook,
            twitter: user.profileData.twitter,
            firstName: user.firstName,
            lastName: user.lastName,
            country: user.profileData.country,
            city: user.profileData.city,
            birthDate: Common.intArrayToDate(user.profileData.birthDate),
            isSetState: true
        });
    };

    updateProfileData = () => {
        this.props.updateUserData(this.state);
    };

    render() {
        if (!this.props.currentUser)
            return '';

        let user = this.props.currentUser;
        return (
            <div className="row" onAnimationEnd={this.onInitState}>
                <div className="col-md-11 center-block ">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h4>Редактирование профиля</h4></div>
                        <div className="panel-body">
                            <h5 className="card-header w-100">Ссылки на социальные сети</h5>
                            <div className="row p-2 ml-4">
                                <div className="col-5 mt-4 d-flex justify-content-end">
                                    <i id="social-fb" className="fa fa-vk social mr-2 mt-4 profile-edit-icon"/>
                                    <span className="mr-2 soc-name">vk.com/</span>
                                    <TextField name="vk" className="soc-input" label="страница vk"
                                               defaultValue={user.profileData.vk} onChange={this.onFieldsChange}/>
                                </div>
                                <div className="col-5 mt-4 d-flex justify-content-end">
                                    <i id="social-gp" className="fa fa-instagram social mr-2 mt-4 profile-edit-icon"/>
                                    <span className="mr-2 soc-name">instagram.com/ </span>
                                    <TextField name="instagram" className="soc-input" label="страница instagram"
                                               defaultValue={user.profileData.instagram} onChange={this.onFieldsChange}/>
                                </div>
                                <div className="col-2"/>
                            </div>

                            <div className="row p-2 ml-4">
                                <div className="col-5  d-flex justify-content-end">
                                    <i id="social-fb"
                                       className="fa fa-facebook-square social mr-2 mt-4 profile-edit-icon"/>
                                    <span className="mr-2 soc-name">facebook.com/</span>
                                    <TextField name="facebook" className="soc-input" label="страница facebook"
                                               defaultValue={user.profileData.facebook} onChange={this.onFieldsChange}/>
                                </div>
                                <div className="col-5 d-flex justify-content-end">
                                    <i id="social-tw" className="fa fa-twitter-square social mr-2 mt-4 profile-edit-icon"/>
                                    <span className="mr-2 soc-name">twitter.com/ </span>
                                    <TextField name="twitter" className="soc-input" label="страница twitter"
                                               defaultValue={user.profileData.twitter} onChange={this.onFieldsChange}/>
                                </div>
                                <div className="col-2"/>
                            </div>


                            <h5 className="card-header w-100">Основная информация</h5>
                            <div className="row p-2 ml-4">
                                <div className="col-5 mt-4 d-flex justify-content-end">
                                    <span className="mr-2 soc-name">Фамилия </span>
                                    <TextField name="lastName" className="soc-input" label=" "
                                               defaultValue={user.lastName} onChange={this.onFieldsChange}/>
                                </div>
                                <div className="col-5 mt-4 d-flex justify-content-end">
                                    <span className="mr-2 soc-name">Имя </span>
                                    <TextField name="firstName" className="soc-input" label=" "
                                               defaultValue={user.firstName} onChange={this.onFieldsChange}/>
                                </div>
                                <div className="col-2"/>
                            </div>

                            <div className="row p-2 ml-4">
                                <div className="col-5 d-flex justify-content-end">
                                    <span className="mr-2 soc-name">Страна </span>
                                    <TextField name="country" className="soc-input" label=" "
                                               defaultValue={user.profileData.country} onChange={this.onFieldsChange}/>
                                </div>
                                <div className="col-5 d-flex justify-content-end">
                                    <span className="mr-2 soc-name">Город </span>
                                    <TextField name="city" className="soc-input" label=" "
                                               defaultValue={user.profileData.city} onChange={this.onFieldsChange}/>
                                </div>
                                <div className="col-2"/>
                            </div>

                            <div className="row p-2 ml-4">
                                <div className="col-5 date-picker d-flex justify-content-end">
                                    <span className="mr-2 soc-name">Дата рождения </span>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            className="soc-input"
                                            label=" "
                                            format="dd.MM.yyyy"
                                            value={this.state.birthDate}
                                            onChange={(value) => {this.setState({birthDate: value})}}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-7">
                                </div>
                            </div>

                            <div className="row p-2 ml-4">
                                <div className="col-12 mt-5 d-flex justify-content-end">
                                    <NavLink to="/profile">
                                        <button type="button" className="btn btn-light mr-3">Вернуться в профиль</button>
                                    </NavLink>
                                    <button type="button" className="btn btn-success" onClick={this.updateProfileData}>Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProfileEdit;