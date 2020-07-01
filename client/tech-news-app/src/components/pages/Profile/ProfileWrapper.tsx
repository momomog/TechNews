import React, {useCallback, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {useHistory, useLocation} from 'react-router-dom'
import Profile from './Profile'
import ProfileAPI from '../../../api/ProfileAPI'
import {User, UserInitial} from '../../../models/UserModel'
import Spinner from '../../core/Spinner'
import {ErrorResponse} from '../../../models/ResponseModel'
import {NotificationManager} from 'react-notifications'
import {getCurrentUserData} from '../../../redux/actions/userActions'
import {RootState} from '../../../redux/reducers/rootReducer'
import MessageAPI from '../../../api/MessageAPI'
import {getDialogMessages} from '../../../redux/actions/messageActions'

interface Props {
    currentUser: User
    getCurrentUserData: () => void
    getDialogMessages: (user: User) => void
}

/**
 * Профиль. Оболочка
 * @param currentUserData
 * @param getCurrentUserData
 */
const ProfileWrapper: React.FC<Props> = ({currentUser, getCurrentUserData, getDialogMessages}) => {
    const [someUser, setSomeUser] = useState<User>(UserInitial)
    const {pathname} = useLocation()
    const history = useHistory()
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

    const redirectToDialogPage = async () => {
        const data = await MessageAPI.createDialog(someUser.id)
        if (data) {
            getDialogMessages(someUser)
            history.push('/messages')
        }
    }

    const profileUser = isCurrentUser() ? currentUser : someUser
    return profileUser.id
        ? <Profile user={profileUser}
                   redirectToDialogPage={redirectToDialogPage}
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
        getCurrentUserData: () => dispatch(getCurrentUserData()),
        getDialogMessages: (dialogUser: User) => dispatch(getDialogMessages(dialogUser)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper)