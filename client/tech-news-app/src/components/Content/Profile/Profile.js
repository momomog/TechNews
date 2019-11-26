import React from "react";

function Profile(props) {

    function onLoadPhoto(e) {
        props.onLoadPhoto(e.target.files[0]);
        window.location = "/profile";
    }

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
                                                 src={'http://localhost:8080/api/user/photo?id=' + props.user.id}/>
                                            <label className="btn btn-primary-outline mt-1 p-0 text-secondary">
                                                загрузить фото профиля
                                                <input type="file" onChange={onLoadPhoto} name="photo" accept="image/*" hidden/>
                                            </label>
                                        </div>
                                        <br/>
                                    </div>
                                    <div className="col-sm-5">
                                        <h2 style={{color: "#00b1b1"}}>{props.user.firstName + ' ' + props.user.lastName} </h2>
                                        <span><p>@{props.user.username}</p></span>
                                    </div>
                                    <div className="col-sm-1"/>
                                    <div className="clearfix mb-5"/>
                                    <hr className="mt-1 mb-1"/>

                                    <div className="col-sm-3"/>
                                    <div className="col-sm-3 col-xs-6 tital">Дата регистрации:</div>
                                    <div className="col-sm-3">15 Jun 2016</div>
                                    <div className="col-sm-3"/>
                                    <div className="clearfix"/>
                                    <div className="bot-border"/>

                                    <div className="col-sm-3"/>
                                    <div className="col-sm-3 col-xs-6 tital">Почтовый адрес:</div>
                                    <div className="col-sm-3">{props.user.email}</div>
                                    <div className="col-sm-3"/>
                                    <div className="clearfix"/>
                                    <div className="bot-border"/>

                                    <div className="col-sm-3"/>
                                    <div className="col-sm-3 col-xs-6 tital ">Дата рождения:</div>
                                    <div className="col-sm-3">11 Jun 1998</div>
                                    <div className="col-sm-3"/>
                                    <div className="clearfix"/>
                                    <div className="bot-border"/>

                                    <div className="col-sm-3"/>
                                    <div className="col-sm-3 col-xs-6 tital ">Место рождения:</div>
                                    <div className="col-sm-3">Shirdi</div>
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


}

export default Profile;