import React from 'react'
import {Message} from '../../../models/messageModel'
import {NavLink} from 'react-router-dom'

interface Props {
    message: Message
    prevMessage: Message
}

export const MessageItem: React.FC<Props> = ({message, prevMessage}) => {
    const showFullInfo = !prevMessage || prevMessage && message.oneUserId !== prevMessage.oneUserId
    const msgStyle = ['row', 'message-item']
    if (message.new)
        msgStyle.push('scale-up-center-message')

    return (
        <div>
            <div className={msgStyle.join(' ')} style={{padding: !showFullInfo ? '3px 0' : '5px 0'}}>
                <div className="col-md-1 p-0">
                    {
                        showFullInfo && <NavLink to={`/profile/${message.oneUserUsername}`}>
                            <img alt="User Pic"
                                 className="img-circle message-user-photo"
                                 src={message.oneUserPhotoId && `https://drive.google.com/uc?export=view&id=${message.oneUserPhotoId}`}/>
                        </NavLink>
                    }
                </div>
                <div className="col-md-11 p-0">
                    {
                        showFullInfo && <div className="d-flex">
                            <div className="message-user-data font-weight-bolder">{message.oneUserFirstName}</div>
                            <div className="message-date">{message.date}</div>
                        </div>
                    }
                    <div className="message-user-data">{message.text}</div>
                </div>
            </div>
        </div>
    )
}