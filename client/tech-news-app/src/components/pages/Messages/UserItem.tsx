import React from 'react'
import {User} from '../../../models/UserModel'
import {NavLink} from 'react-router-dom'

interface Props {
    user: User
    dialogUser: User
    getMessages: (dialogUser: User) => void
}

export const UserItem: React.FC<Props> = ({user, getMessages, dialogUser}) => {
    return (
        <div className="user-item"
             style={{backgroundColor: user.id === dialogUser.id ? '#eeeeee' : ''}}
             onClick={() => getMessages(user)}>
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
                    </div>
                </div>
            </div>
        </div>
    )
}