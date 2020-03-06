import React, {useState} from "react";
import Spinner from "../../common/Spinner";
import {ProfileData} from "./ProfileData/ProfileData";
import {SocialIcons} from "./SocialIcons/SocialIcons";

function Profile(props) {
    let user = props.isNotCurrentUser ? props.user : props.currentUser;
    const [isLoading, setIsLoading] = useState(false);

    function onLoadPhoto(e) {
        setIsLoading(true);
        props.updateUserPhoto(e.target.files[0]);

        setTimeout(() => {
            window.location = '/profile';
            setIsLoading(false);
        }, 5000);
    }

    if (user.profileData) {
        return (
                <div className="row">
                    <div className="row col-md-11 center-block ">
                        <div className="panel panel-default">
                            <div className="panel-heading"><h4>Профиль пользователя</h4></div>
                            <div className="panel-body">
                                <div className="box box-info">
                                    <div className="box-body">
                                        <div className="col-sm-2"/>
                                        <div className="col-sm-4">
                                            <div align="center">
                                                {
                                                    isLoading
                                                        ? <Spinner/>
                                                        : <img alt="User Pic"
                                                               className="img-circle profile-photo mt-3"
                                                               src={user.profileData.photoId
                                                                   ? `https://drive.google.com/uc?export=view&id=${user.profileData.photoId}`
                                                                   : ''
                                                               }/>
                                                }
                                                {
                                                    props.isNotCurrentUser
                                                        ? ''
                                                        : <label hidden={isLoading}
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
                                                {user.firstName + ' ' + user.lastName}
                                            </h2>
                                            <span>
                                            <p>
                                                 @{user.username}
                                            </p>
                                        </span>

                                            <SocialIcons user={user}/>

                                        </div>

                                        <ProfileData user={user}/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Profile;