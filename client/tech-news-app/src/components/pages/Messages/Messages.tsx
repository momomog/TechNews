import React, {useContext, useEffect} from 'react'
import {User} from '../../../models/UserModel'
import {ThemeContext} from '../../../context/ThemeContext'
import {MessageItem} from './messageComponents/MessageItem'
import {UserItem} from './messageComponents/UserItem'
import {Message} from '../../../models/MessageModel'
import {AuthContext} from '../../../context/AuthContext'
import {MessageInput} from './messageComponents/MessageInput'

interface Props {
    users: Array<User>
    getMessages: (dialogUser: User) => void
    messages: Array<Message>
    dialogUser: User
    writingUsers: Array<number>
}

/**
 * Сообщения
 * @param users
 * @param writingUsers
 * @param getMessages
 * @param messages
 * @param dialogUser
 */
const Messages: React.FC<Props> = ({users, writingUsers, getMessages, messages, dialogUser}) => {
    const {isLight} = useContext(ThemeContext)
    const {user} = useContext(AuthContext)
    const cardClasses = ['panel', 'panel-default', isLight ? 'background-light' : 'background-dark']
    const messagesListRef: React.RefObject<HTMLDivElement> = React.createRef()

    useEffect(() => {
        scrollToBottomMessage()
    }, [user, messages])


    const scrollToBottomMessage = () => {
        if (messagesListRef.current)
            messagesListRef.current.scrollTo(0, messagesListRef.current.scrollHeight)
    }

    return (
        <div className="row">
            <div className="col-md-11 center-block pl-0 pr-0">
                <div className={cardClasses.join(' ')}>
                    <div className="panel-heading"><h3>Сообщения</h3></div>
                    <div className="messages-panel-body">
                        <div className="row">
                            <div className="col-md-4 users-container">
                                {
                                    users.map(user => <UserItem key={user.id}
                                                                dialogUser={dialogUser}
                                                                getMessages={getMessages}
                                                                user={user}/>)
                                }

                            </div>
                            <div className="col-md-8 messages-container">
                                <div ref={messagesListRef} className="messages-list">
                                    {
                                        dialogUser.id
                                            ? messages.map((message, idx, arr) => <MessageItem key={message.id}
                                                                                               prevMessage={arr[idx - 1]}
                                                                                               message={message}/>)
                                            : <div className="not-chosen-dialog-center">Выберите собеседника для начала
                                                разговора</div>
                                    }
                                </div>
                                {
                                    dialogUser.id
                                        ? <MessageInput user={user}
                                                        writingUsers={writingUsers}
                                                        dialogUser={dialogUser}
                                                        scrollToBottomMessage={scrollToBottomMessage}/>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages