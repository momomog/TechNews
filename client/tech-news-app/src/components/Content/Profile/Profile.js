import React from "react";

function Profile(props) {

    return (
        <div>
            <div className="row">
                <div className="col-md-7 center-block ">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h4>Профиль пользователя</h4></div>
                        <div className="panel-body">
                            <div className="box box-info">
                                <div className="box-body">
                                    <div className="col-sm-6">
                                        <div align="center">
                                            <img alt="User Pic"
                                                 src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                                                 id="profile-image1"
                                                 className="img-circle img-responsive"/>

                                            <input id="profile-image-upload" className="hidden" type="file"/>
                                            <div style={{color: "#999"}}>загрузить фото профиля</div>
                                        </div>
                                        <br/>
                                    </div>
                                    <div className="col-sm-6">
                                        <h4 style={{color: "#00b1b1"}}>{props.user.name} </h4>
                                        <span><p>@{props.user.username}</p></span>
                                    </div>
                                    <div className="clearfix"></div>
                                    <hr style={{margin: "5px 0 5px 0"}}/>


                                    <div className="col-sm-5 col-xs-6 tital ">Дата регистрации:</div>
                                    <div className="col-sm-7">15 Jun 2016</div>
                                    <div className="clearfix"></div>
                                    <div className="bot-border"></div>

                                    <div className="col-sm-5 col-xs-6 tital ">Дата рождения:</div>
                                    <div className="col-sm-7">11 Jun 1998</div>
                                    <div className="clearfix"></div>
                                    <div className="bot-border"></div>

                                    <div className="col-sm-5 col-xs-6 tital ">Место рождения:</div>
                                    <div className="col-sm-7">Shirdi</div>
                                    <div className="clearfix"></div>
                                    <div className="bot-border"></div>
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