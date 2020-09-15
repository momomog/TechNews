import React, {useContext, useState} from 'react'
import Spinner from '../../core/Spinner'
import ProfilePictureModal from './ProfileData/ProfilePictureModal'
import {NotificationManager} from 'react-notifications'
import {User} from '../../../models/UserModel'
import ProfileData from './ProfileData/ProfileData'
import SocialIcons from './ProfileData/SocialIcons'
import {ThemeContext} from '../../../context/ThemeContext'

interface Props {
    user: User
    isAuth: boolean
    isCurrentUser: boolean
    onLoadPhoto: (photo: File) => void
    redirectToDialogPage: () => void
}

/**
 * Профиль
 */
const Profile: React.FC<Props> = ({user, isAuth, isCurrentUser, redirectToDialogPage, onLoadPhoto}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [picture, setPicture] = useState(undefined)

    const {isLight} = useContext(ThemeContext)
    const cardClasses = ['panel', 'panel-default', isLight ? 'background-light' : 'background-dark']

    const changePhoto = (e) => {
        if (e.target.files[0].type.includes('image')) {
            setPicture(e.target.files[0])
            setIsOpenModal(true)
        } else
            NotificationManager.error('Загружаемый файл должен быть изображением', 'Ошибка загрузки')
    }

    const LoadPhoto = (file: File) => {
        setIsLoading(true)
        onLoadPhoto(file)
        setTimeout(() => setIsLoading(false), 5000)
    }

    const triggerModal = () => setIsOpenModal(false)

    return (
        <div className="row">
            <div className="col-md-11 center-block pl-0 pr-0">
                <div className={cardClasses.join(' ')}>
                    <div className="panel-heading"><h3>Профиль пользователя</h3></div>
                    <div className="panel-body">
                        <div className="box box-info">
                            <div className="row">
                                <div className="col-sm-2"/>
                                <div className="col-sm-5">
                                    <div className="text-center">

                                        {
                                            isLoading
                                                ? <Spinner/>
                                                : <>
                                                    <img alt="User Pic"
                                                         className="img-circle profile-photo mt-3"
                                                         src={user.profileData.photoId && `https://drive.google.com/uc?export=view&id=${user.profileData.photoId}`}/>
                                                </>
                                        }
                                        {
                                            isCurrentUser &&
                                            <label hidden={isLoading}
                                                   className="btn btn-primary-outline mt-1 p-0 text-secondary">
                                                загрузить фото
                                                {
                                                    isOpenModal && <ProfilePictureModal isOpenModal={isOpenModal}
                                                                                        onLoadPhoto={LoadPhoto}
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
                                    <h1 style={{color: '#00b1b1'}}>
                                        {`${user.firstName} ${user.lastName}`}
                                    </h1>
                                    <span>
                                        @{user.username}
                                    </span>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-sm-7 d-flex justify-content-center">
                                    {
                                        isAuth && !isCurrentUser &&
                                        <button className="btn btn-info send-msg-btn"
                                                onClick={redirectToDialogPage}>
                                            Отправить сообщение
                                        </button>
                                    }

                                </div>
                                <div className="col-sm-5">
                                    <SocialIcons user={user}/>
                                </div>
                            </div>

                            <ProfileData user={user}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile