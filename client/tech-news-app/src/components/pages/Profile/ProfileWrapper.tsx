import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {useLocation} from 'react-router-dom'
import Profile from './Profile'
import ProfileAPI from '../../../api/ProfileAPI'
import {getCurrentUserData} from '../../../redux/UserReducer'
import {User, UserInitial} from '../../../models/UserModel'
import {RootState} from '../../../redux/ReduxStore'
import Spinner from '../../core/Spinner'
import {ErrorResponse} from '../../../models/ResponseModel'
import {NotificationManager} from 'react-notifications'
import history from '../../../history'

interface Props {
    userData: User
    getCurrentUserData: () => void
}

/**
 * Профиль. Оболочка
 * @param userData
 * @param getCurrentUserData
 */
const ProfileWrapper: React.FC<Props> = ({userData, getCurrentUserData}) => {
    const [user, setUser] = useState<User>(UserInitial)
    const {pathname} = useLocation()
    const path = pathname.split('/')

    useEffect(() => {
        if (isCurrentUser()) {
            if (!userData.id)
                getCurrentUserData()
        } else if (!user.id) {
            ProfileAPI.getUserProfile(path[2])
                .then((response: User) => setUser(response))
                .catch((error: ErrorResponse) => history.push(`/error/${error.code}`))
        }
    }, [path, getCurrentUserData, userData.id, user.id])

    function isCurrentUser(): boolean {
        return ((path[1] === 'profile' && path.length === 2)
            || (path[1] === 'profile' && userData && userData.username === path[2]))
    }

    const updateUserPhoto = (body) => {
        ProfileAPI.onLoadPhoto(body)
            .then(() => getCurrentUserData())
            .catch(() => NotificationManager.error('Не удалось обновить фото профиля', 'Ошибка'))
    }

    const profileUser = isCurrentUser() ? userData : user

    return profileUser.id
        ? <Profile user={profileUser}
                   isCurrentUser={isCurrentUser()}
                   onLoadPhoto={updateUserPhoto}/>
        : <Spinner/>
}

let mapStateToProps = (state: RootState) => {
    return {
        userData: state.userData.userData
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getCurrentUserData: () => dispatch(getCurrentUserData())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper)