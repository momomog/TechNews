import React from 'react'
import {Message} from '../../../models/messageModel'
import {NavLink} from 'react-router-dom'

interface Props {
    message: Message
}

export const MessageItem: React.FC<Props> = ({message}) => {
    return (
        <div>
            <div className="row message-item">
                <div className="col-md-1 p-0">
                    <NavLink to={`/profile/${message.oneUserUsername}`}>
                        <img alt="User Pic"
                             className="img-circle message-user-photo"
                             src={message.oneUserPhotoId && `https://drive.google.com/uc?export=view&id=${message.oneUserPhotoId}`}/>
                    </NavLink>
                </div>
                <div className="col-md-11 p-0">
                    <div className="d-flex">
                        <div className="message-user-data font-weight-bolder">{message.oneUserFirstName}</div>
                        <div className="message-user-data ml-2">{message.date}</div>
                    </div>
                    <div className="message-user-data">{message.text}</div>
                </div>
            </div>
        </div>
    )
}