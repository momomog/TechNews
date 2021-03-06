import React, {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import Profile from './Profile'
import ProfileAPI from '../../../api/ProfileAPI'
import {User, UserInitial, UserState} from '../../../models/UserModel'
import Spinner from '../../core/Spinner'
import {ErrorResponse} from '../../../models/ResponseModel'
import {NotificationManager} from 'react-notifications'
import {getCurrentUserData} from '../../../redux/actions/userActions'
import MessageAPI from '../../../api/MessageAPI'
import {getDialogMessages, getDialogUsers} from '../../../redux/actions/messageActions'
import {userDataSelector} from '../../../redux/selectors/selectors'
import {History, Location} from 'history'
import {Dispatch} from "redux";


/**
 * Профиль. Оболочка
 */
const ProfileWrapper: React.FC = () => {
    const [someUser, setSomeUser] = useState<User>(UserInitial),
        {pathname}: Location = useLocation(),
        {isAuth, userData: currentUser}: UserState = useSelector(userDataSelector),
        history: History = useHistory(),
        dispatch: Dispatch = useDispatch(),
        path: Array<string> = pathname.split('/')

    const isCurrentUser: boolean = useMemo((): boolean => {
            return ((path[1] === 'profile' && path.length === 2)
                || (path[1] === 'profile' && currentUser && currentUser.username === path[2]))
        }, [path, currentUser]
    )

    useEffect(() => {
        if (isCurrentUser) {
            if (!currentUser.id)
                dispatch(getCurrentUserData())
        } else if (!someUser.id) {
            ProfileAPI.getUserProfile(path[2])
                .then((response: User) => setSomeUser(response))
                .catch((error: ErrorResponse) => history.push(`/error/${error.code}`))
        }
    }, [path, currentUser.id, someUser.id, isCurrentUser])

    const updateUserPhoto = async (body) => {
        try {
            await ProfileAPI.onLoadPhoto(body)
            dispatch(getCurrentUserData())
        } catch (e) {
            NotificationManager.error('Не удалось обновить фото профиля', 'Ошибка')
        }
    }

    const redirectToDialogPage = async () => {
        try {
            await MessageAPI.createDialog(someUser.id)
            dispatch(getDialogUsers())
            dispatch(getDialogMessages(someUser))
            history.push('/messages')
        } catch (e) {
            console.log(e)
        }
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

export default ProfileWrapper
