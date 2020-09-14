import React, {useCallback, useEffect, useMemo, useState} from 'react'
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
import {getDialogMessages, getDialogUsers} from '../../../redux/actions/messageActions'

interface Props {
    currentUser: User
    isAuth: boolean
    getCurrentUserData: () => void
    getDialogUsers: () => void
    getDialogMessages: (user: User) => void
}

/**
 * Профиль. Оболочка
 */
const ProfileWrapper: React.FC<Props> = ({currentUser, isAuth, getDialogUsers, getCurrentUserData, getDialogMessages}) => {
    const [someUser, setSomeUser] = useState<User>(UserInitial)
    const {pathname} = useLocation()
    const history = useHistory()
    const path = pathname.split('/')

    const isCurrentUser = useMemo(() => {
            return ((path[1] === 'profile' && path.length === 2)
                || (path[1] === 'profile' && currentUser && currentUser.username === path[2]))
        }, [path, currentUser]
    )

    useEffect(() => {
        if (isCurrentUser) {
            if (!currentUser.id)
                getCurrentUserData()
        } else if (!someUser.id) {
            ProfileAPI.getUserProfile(path[2])
                .then((response: User) => setSomeUser(response))
                .catch((error: ErrorResponse) => history.push(`/error/${error.code}`))
        }
    }, [path, currentUser.id, someUser.id, isCurrentUser])

    const updateUserPhoto = (body) => {
        ProfileAPI.onLoadPhoto(body)
            .then(() => getCurrentUserData())
            .catch(() => NotificationManager.error('Не удалось обновить фото профиля', 'Ошибка'))
    }

    const redirectToDialogPage = async () => {
        await MessageAPI.createDialog(someUser.id)
        await getDialogUsers()
        await getDialogMessages(someUser)
        history.push('/messages')
    }

    const profileUser = isCurrentUser ? currentUser : someUser
    return profileUser.id
        ? <Profile user={profileUser}
                   isAuth={isAuth}
                   redirectToDialogPage={redirectToDialogPage}
                   isCurrentUser={isCurrentUser}
                   onLoadPhoto={updateUserPhoto}/>
        : <Spinner/>
}

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.userData.userData,
        isAuth: state.userData.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getCurrentUserData: () => dispatch(getCurrentUserData()),
        getDialogMessages: (dialogUser: User) => dispatch(getDialogMessages(dialogUser)),
        getDialogUsers: () => dispatch(getDialogUsers())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper)