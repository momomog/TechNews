import React from 'react'
import {User} from '../../../../models/UserModel'
import {NavLink} from 'react-router-dom'
import {Message} from '../../../../models/MessageModel'

interface Props {
    user: User
    dialogUser: User
    unreadMessages: Array<Message>
    getMessages: (dialogUser: User) => void
    readDialogMessages: (dialogUser: User) => void
}

/*
 * Пользователь списка диалогов
 */
export const UserItem: React.FC<Props> = ({user, unreadMessages, readDialogMessages, getMessages, dialogUser}: Props) => {
    const unreadMsgsForUser: Array<Message> = unreadMessages.filter(msg => user.id !== msg.dialogUserId)

    const openDialog = () => unreadMsgsForUser.length > 0 ? readDialogMessages(user) : getMessages(user)

    return (
        <div className="user-item"
             style={{backgroundColor: user.id === dialogUser.id ? '#eeeeee' : ''}}
             onClick={openDialog}>
            <div className="row">
                <div className="col-md-2">
                    <NavLink to={`/profile/${user.username}`}>
                        <img alt="User Pic"
                             className="img-circle message-user-photo"
                             src={user.profileData.photoId && `https://drive.google.com/uc?export=view&id=${user.profileData.photoId}`}/>
                    </NavLink>

                </div>
                <div className="col-md-10">
                    <div className="username">
                        {`${user.firstName} ${user.lastName}`}
                        {
                            unreadMsgsForUser.length > 0 && <span className="unread-msg-counter">{unreadMsgsForUser.length}</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
