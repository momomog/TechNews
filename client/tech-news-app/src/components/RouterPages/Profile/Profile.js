import React, {useState} from "react";
import Spinner from "../../core/Spinner";
import {ProfileData} from "./ProfileData/ProfileData";
import {SocialIcons} from "./ProfileData/SocialIcons";
import ProfilePictureModal from "./ProfileData/ProfilePictureModal";

function Profile(props) {
    let user = props.isNotCurrentUser ? props.user : props.currentUser;
    const [isLoading, setIsLoading] = useState(false),
        [isOpenModal, setIsOpenModal] = useState(false),
        [picture, setPicture] = useState(undefined);

    function changePhoto(e) {
        setPicture(e.target.files[0])
        setIsOpenModal(true)
    }

    const onLoadPhoto = (file) => {
        setIsLoading(true);
        props.onLoadPhoto(file);

        setTimeout(() => setIsLoading(false), 5000)
    }

    function triggerModal() {
        setIsOpenModal(false)
    }

    if (user) {
        return (
            <div className="row">
                <div className="col-md-11 center-block">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h4>Профиль пользователя</h4></div>
                        <div className="panel-body">
                            <div className="box box-info">
                                <div className="row">
                                    <div className="col-sm-2"/>
                                    <div className="col-sm-5">
                                        <div align="center">

                                            {
                                                isLoading
                                                    ? <Spinner/>
                                                    : <div>
                                                        <img alt="User Pic"
                                                             className="img-circle profile-photo mt-3"
                                                             src={user.profileData.photoId && `https://drive.google.com/uc?export=view&id=${user.profileData.photoId}`}/>
                                                    </div>
                                            }
                                            {
                                                !props.isNotCurrentUser &&
                                                <label hidden={isLoading}
                                                       className="btn btn-primary-outline mt-1 p-0 text-secondary">
                                                    загрузить фото
                                                    {
                                                        isOpenModal && <ProfilePictureModal isOpenModal={isOpenModal}
                                                                                            onLoadPhoto={onLoadPhoto}
                                                                                            triggerModal={triggerModal}
                                                                                            picture={picture}/>
                                                    }

                                                    <input type="file"
                                                           onChange={changePhoto}
                                                           name="photo" accept="image/*" hidden/>
                                                </label>
                                            }

                                        </div>
                                        <br/>
                                    </div>
                                    <div className="col-sm-5">
                                        <h2 style={{color: "#00b1b1"}}>
                                            {`${user.firstName} ${user.lastName}`}
                                        </h2>
                                        <span>
                                            <p>@{user.username}</p>
                                        </span>



                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-7"/>
                                    <div className="col-sm-5">
                                        <SocialIcons profileData={user.profileData}/>
                                    </div>
                                </div>
                                <ProfileData user={user}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else
        return <div>empty</div>
}

export default Profile