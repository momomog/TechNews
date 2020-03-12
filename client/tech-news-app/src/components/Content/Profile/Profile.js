import React, {useState} from "react";
import Spinner from "../../common/Spinner";
import {ProfileData} from "./ProfileData/ProfileData";
import {SocialIcons} from "./ProfileData/SocialIcons";
import ProfilePictureModal from "./ProfilePictureModal";

function Profile(props) {
    let user = props.isNotCurrentUser ? props.user : props.currentUser;
    const [isLoading, setIsLoading] = useState(false),
        [isOpenModal, setIsOpenModal] = useState(false),
        [picture, setPicture] = useState(undefined);

    function onLoadPhoto(e) {
        // setIsLoading(true);
        // props.onLoadPhoto(e.target.files[0]);
// debugger
        setPicture(e.target.files[0])
        setIsOpenModal(!isOpenModal)

        // setTimeout(() => {
        //     window.location = '/profile';
        //     setIsLoading(false);
        // }, 5000);
    }

    function triggerModal(value) {
        setIsOpenModal(value)
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
                                                           src={user.profileData.photoId && `https://drive.google.com/uc?export=view&id=${user.profileData.photoId}`}/>
                                            }
                                            {
                                                !props.isNotCurrentUser &&
                                                <label hidden={isLoading}
                                                       className="btn btn-primary-outline mt-1 p-0 text-secondary">
                                                    загрузить фото
                                                    {
                                                        isOpenModal && <ProfilePictureModal isOpenModal={isOpenModal}
                                                                                            triggerModal={triggerModal}
                                                                                            picture={picture}/>
                                                    }

                                                    <input type="file"
                                                           onChange={onLoadPhoto}
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

                                        <SocialIcons profileData={user.profileData}/>

                                    </div>

                                    <ProfileData user={user}/>

                                </div>
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