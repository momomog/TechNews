import React from "react";
import Common from "../../../common/Common";
import {Link, NavLink} from "react-router-dom";

function Profile(props) {
    // let profileImage = React.createRef();

    function onLoadPhoto(e) {
        props.onLoadPhoto(e.target.files[0]);
        setTimeout(function () {
            window.location = "/profile";
        }, 400);
    }

    function getUserPhotoUrl() {
        if (props.user.id || props.currentUser.id) {
            if (props.isNotCurrentUser) {
                return 'http://localhost:8080/api/user/photo?id=' + props.user.id;
            }
            // const src = 'http://localhost:8080/api/user/photo?id=' + props.currentUser.id;
            // const options = {
            //     headers: {
            //         Authorization: 'Bearer ' + Common.getToken()
            //     }
            // };
            // fetch(src, options)
            //     .then(res => res.blob())
            //     .then(blob => {
            //         debugger;
            //         profileImage.src = URL.createObjectURL(blob);
            //     });
            return 'http://localhost:8080/api/user/photo?id=' + props.currentUser.id;
        }
    }

    if (props.user || props.currentUser) {
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
                                                     src={getUserPhotoUrl()}/>

                                                {
                                                    props.isNotCurrentUser
                                                        ? ''
                                                        :
                                                        <label className="btn btn-primary-outline mt-1 p-0 text-secondary">
                                                            загрузить фото профиля
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
                                                    props.isNotCurrentUser
                                                        ? props.user.firstName + ' ' + props.user.lastName
                                                        : props.currentUser.firstName + ' ' + props.currentUser.lastName
                                                }
                                            </h2>
                                            <span>
                                            <p>
                                                 @{
                                                props.isNotCurrentUser
                                                    ? props.user.username
                                                    : props.currentUser.username
                                            }
                                            </p>
                                        </span>
                                            <div className="profile-social-icon">
                                                <a target="_blank" href="//https://vk.com/id47945255">
                                                    <i id="social-fb" className="fa fa-facebook-square fa-2x social mr-2"/>
                                                </a>
                                                <i id="social-gp" className="fa fa-instagram fa-2x social mr-2"/>
                                                <i id="social-fb" className="fa fa-vk fa-2x social mr-2"/>
                                                <i id="social-tw" className="fa fa-twitter-square fa-2x social mr-2м"/>
                                            </div>
                                        </div>
                                        <div className="col-sm-1"/>
                                        <div className="clearfix mb-2"/>
                                        <hr className="mt-1 mb-1"/>



                                        <div className="col-sm-3"/>
                                        <div className="col-sm-3 col-xs-6 tital">Дата регистрации:</div>
                                        <div className="col-sm-3">
                                            {
                                                props.isNotCurrentUser
                                                    ? Common.dateParser(props.user.createAt)
                                                    : Common.dateParser(props.currentUser.createAt)
                                            }
                                        </div>
                                        <div className="col-sm-3"/>
                                        <div className="clearfix"/>
                                        <div className="bot-border"/>



                                        <div className="col-sm-3"/>
                                        <div className="col-sm-3 col-xs-6 tital">Email:</div>
                                        <div className="col-sm-3">
                                            {
                                                props.isNotCurrentUser
                                                    ? props.user.email
                                                    : props.currentUser.email
                                            }
                                        </div>
                                        <div className="col-sm-3"/>
                                        <div className="clearfix"/>
                                        <div className="bot-border"/>



                                        <div className="col-sm-3"/>
                                        <div className="col-sm-3 col-xs-6 tital ">Дата рождения:</div>
                                        <div className="col-sm-3">
                                            {
                                                props.isNotCurrentUser
                                                    ? Common.dateParser(props.user.profileData.birthDate) + ', ' + Common.getUserAge(props.user.profileData.birthDate)
                                                    : Common.dateParser(props.currentUser.profileData.birthDate) + ', ' + Common.getUserAge(props.currentUser.profileData.birthDate)
                                            }
                                        </div>
                                        <div className="col-sm-3"/>
                                        <div className="clearfix"/>
                                        <div className="bot-border"/>

                                        <div className="col-sm-3"/>
                                        <div className="col-sm-3 col-xs-6 tital ">Город:</div>
                                        <div className="col-sm-3">
                                            {
                                                props.isNotCurrentUser
                                                    ? props.user.profileData.country + ', ' + props.user.profileData.city
                                                    : props.currentUser.profileData.country + ', ' + props.currentUser.profileData.city
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