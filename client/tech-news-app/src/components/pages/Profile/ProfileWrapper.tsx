import React, {useCallback, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {useLocation} from 'react-router-dom'
import Profile from './Profile'
import ProfileAPI from '../../../api/ProfileAPI'
import {User, UserInitial} from '../../../models/UserModel'
import Spinner from '../../core/Spinner'
import {ErrorResponse} from '../../../models/ResponseModel'
import {NotificationManager} from 'react-notifications'
import history from '../../../history'
import {getCurrentUserData} from '../../../redux/actions/userActions'
import {RootState} from '../../../redux/reducers/rootReducer'

interface Props {
    currentUser: User
    getCurrentUserData: () => void
}

/**
 * Профиль. Оболочка
 * @param currentUserData
 * @param getCurrentUserData
 */
const ProfileWrapper: React.FC<Props> = ({currentUser, getCurrentUserData}) => {
    const [someUser, setSomeUser] = useState<User>(UserInitial)
    const {pathname} = useLocation()
    const path = pathname.split('/')

    const isCurrentUser = useCallback(() => {
            return ((path[1] === 'profile' && path.length === 2)
                || (path[1] === 'profile' && currentUser && currentUser.username === path[2]))
        }, [path, currentUser]
    )

    useEffect(() => {
        if (isCurrentUser()) {
            if (!currentUser.id)
                getCurrentUserData()
        } else if (!someUser.id) {
            ProfileAPI.getUserProfile(path[2])
                .then((response: User) => setSomeUser(response))
                .catch((error: ErrorResponse) => history.push(`/error/${error.code}`))
        }
    }, [path, getCurrentUserData, currentUser.id, someUser.id, isCurrentUser])

    const updateUserPhoto = (body) => {
        ProfileAPI.onLoadPhoto(body)
            .then(() => getCurrentUserData())
            .catch(() => NotificationManager.error('Не удалось обновить фото профиля', 'Ошибка'))
    }

    const profileUser = isCurrentUser() ? currentUser : someUser

    return profileUser.id
        ? <Profile user={profileUser}
                   isCurrentUser={isCurrentUser()}
                   onLoadPhoto={updateUserPhoto}/>
        : <Spinner/>
}

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.userData.userData
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getCurrentUserData: () => dispatch(getCurrentUserData())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper)