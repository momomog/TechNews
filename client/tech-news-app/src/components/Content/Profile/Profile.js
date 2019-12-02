import React from "react";
import Common from "../../../common/Common";
import {API_BASE_URL} from "../../../api/BaseRequest";

function Profile(props) {
    let user = props.isNotCurrentUser ? props.user : props.currentUser;

    function onLoadPhoto(e) {
        props.onLoadPhoto(e.target.files[0]);
        Common.changeLocation('/profile', 400);
    }

    if (user.profileData) {
        return (
            <div>
                <div className="row">
                    <div className="col-md-11 center-block ">
                        <div className="panel panel-default">
                            <div className="panel-heading"><h4>Профиль пользователя</h4></div>
                            <div className="panel-body">
                                <div className="box box-info">
                                    <div className="box-body">
                                        <div className="col-sm-2"/>
                                        <div className="col-sm-4">
                                            <div align="center">
                                                <img alt="User Pic" className="img-circle profile-photo mt-3"
                                                     src={API_BASE_URL + `/user/photo?id=${user.id}`}/>
                                                {
                                                    props.isNotCurrentUser
                                                        ? ''
                                                        : <label
                                                            className="btn btn-primary-outline mt-1 p-0 text-secondary">
                                                            загрузить фото
                                                            <input type="file" onChange={onLoadPhoto} name="photo"
                                                                   accept="image/*" hidden/>
                                                        </label>
                                                }

                                            </div>
                                            <br/>
                                        </div>
                                        <div className="col-sm-5">
                                            <h2 style={{color: "#00b1b1"}}>
                                                {
                                                    user.firstName + ' ' + user.lastName
                                                }
                                            </h2>
                                            <span>
                                            <p>
                                                 @{
                                                    user.username
                                                  }
                                            </p>
                                        </span>
                                            <div className="profile-social-icon">
                                                {
                                                    user.profileData.facebook
                                                        ? <a href={'https://www.facebook.com/' + user.profileData.facebook} target="_blank">
                                                            <i id="social-fb" className="fa fa-facebook-square fa-2x social mr-2"/>
                                                        </a>
                                                        : <i id="social-fb" className="fa fa-facebook-square fa-2x social mr-2"/>
                                                }

                                                {
                                                    user.profileData.instagram
                                                        ? <a href={'https://www.instagram.com/' + user.profileData.instagram} target="_blank">
                                                            <i id="social-gp" className="fa fa-instagram fa-2x social mr-2"/>
                                                        </a>
                                                        : <i id="social-gp" className="fa fa-instagram fa-2x social mr-2"/>
                                                }

                                                {
                                                    user.profileData.vk
                                                        ? <a href={'https://www.vk.com/' + user.profileData.vk} target="_blank">
                                                            <i id="social-fb" className="fa fa-vk fa-2x social mr-2"/>
                                                        </a>
                                                        : <i id="social-fb" className="fa fa-vk fa-2x social mr-2"/>
                                                }

                                                {
                                                    user.profileData.twitter
                                                        ? <a href={'https://www.twitter.com/' + user.profileData.twitter} target="_blank">
                                                            <i id="social-tw" className="fa fa-twitter-square fa-2x social mr-2м"/>
                                                        </a>
                                                        : <i id="social-tw" className="fa fa-twitter-square fa-2x social mr-2м"/>
                                                }

                                            </div>
                                        </div>
                                        <div className="col-sm-1"/>
                                        <div className="clearfix mb-2"/>
                                        <hr className="mt-1 mb-1"/>


                                        <div className="col-sm-3"/>
                                        <div className="col-sm-3 col-xs-6 tital">Дата регистрации:</div>
                                        <div className="col-sm-3">
                                            {
                                                Common.dateParser(user.createAt)
                                            }
                                        </div>
                                        <div className="col-sm-3"/>
                                        <div className="clearfix"/>
                                        <div className="bot-border"/>


                                        <div className="col-sm-3"/>
                                        <div className="col-sm-3 col-xs-6 tital">Email:</div>
                                        <div className="col-sm-3">
                                            {
                                                user.email
                                            }
                                        </div>
                                        <div className="col-sm-3"/>
                                        <div className="clearfix"/>
                                        <div className="bot-border"/>


                                        <div className="col-sm-3"/>
                                        <div className="col-sm-3 col-xs-6 tital ">Дата рождения:</div>
                                        <div className="col-sm-3">
                                            {
                                                user.profileData.birthDate
                                                    ? Common.dateParser(user.profileData.birthDate) + ', ' + Common.getUserAge(user.profileData.birthDate)
                                                    : <i>Не указано</i>
                                            }
                                        </div>
                                        <div className="col-sm-3"/>
                                        <div className="clearfix"/>
                                        <div className="bot-border"/>

                                        <div className="col-sm-3"/>
                                        <div className="col-sm-3 col-xs-6 tital ">Страна, город:</div>
                                        <div className="col-sm-3">
                                            {
                                                user.profileData.country
                                                    ? user.profileData.country + ', '
                                                    : <i>Не указано, </i>
                                            }

                                            {
                                                user.profileData.city
                                                    ? user.profileData.city
                                                    : <i>не указано</i>
                                            }
                                        </div>
                                        <div className="col-sm-3"/>
                                        <div className="clearfix"/>
                                        <div className="bot-border"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div>Empty profile data</div>
    }


}

export default Profile;