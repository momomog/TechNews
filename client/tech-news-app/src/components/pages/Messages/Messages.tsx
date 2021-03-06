import React, {useContext, useEffect} from 'react'
import {User} from '../../../models/UserModel'
import {AppThemeContext, ThemeContext} from '../../../context/ThemeContext'
import {MessageItem} from './messageComponents/MessageItem'
import {UserItem} from './messageComponents/UserItem'
import {DialogUser, Message} from '../../../models/MessageModel'
import {AppAuthContext, AuthContext} from '../../../context/AuthContext'
import {MessageInput} from './messageComponents/MessageInput'

interface Props {
    users: Array<DialogUser>
    getMessages: (dialogUser: User) => void
    readDialogMessages: (dialogUser: User) => void
    messages: Array<Message>
    dialogUser: User
    writingUsers: Array<number>
}

/**
 * Сообщения
 */
const Messages: React.FC<Props> = ({users, writingUsers, readDialogMessages, getMessages, messages, dialogUser}: Props) => {
    const {isLight}: AppThemeContext = useContext(ThemeContext)
    const {user}: AppAuthContext = useContext(AuthContext)
    const cardClasses: Array<string> = ['panel', 'panel-default', isLight ? 'background-light' : 'background-dark']
    const messagesListRef: React.RefObject<HTMLDivElement> = React.createRef()

    const scrollToBottomMessage = () => {
        if (messagesListRef.current)
            messagesListRef.current.scrollTo(0, messagesListRef.current.scrollHeight)
    }

    useEffect(() => {
        scrollToBottomMessage()
    }, [user, messages])

    return (
        <div className="row">
            <div className="col-md-11 center-block pl-0 pr-0">
                <div className={cardClasses.join(' ')}>
                    <div className="panel-heading"><h3>Сообщения</h3></div>
                    <div className="messages-panel-body">
                        <div className="row">
                            <div className="col-md-4 users-container">
                                {
                                    users.map(item => <UserItem key={item.user.id}
                                                                dialogUser={dialogUser}
                                                                getMessages={getMessages}
                                                                readDialogMessages={readDialogMessages}
                                                                unreadMessages={item.messages}
                                                                user={item.user}/>)
                                }
                            </div>
                            <div className="col-md-8 messages-container">
                                <div ref={messagesListRef} className="messages-list">
                                    {
                                        dialogUser.id > 0
                                            ? messages.map((message, idx, arr) => (
                                                <MessageItem key={message.id}
                                                             prevMessage={arr[idx - 1]}
                                                             message={message}/>
                                            ))
                                            : <div className="not-chosen-dialog-center">Выберите собеседника для начала
                                                диалога</div>
                                    }
                                </div>
                                {
                                    dialogUser.id > 0 && (
                                        <MessageInput writingUsers={writingUsers}
                                                      dialogUser={dialogUser}
                                                      scrollToBottomMessage={scrollToBottomMessage}/>
                                    )
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
