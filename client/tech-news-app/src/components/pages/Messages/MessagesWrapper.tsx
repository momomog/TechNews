import React, {useContext, useEffect} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import Messages from './Messages'
import {User} from '../../../models/UserModel'
import Spinner from '../../core/Spinner'
import {RootState} from '../../../redux/reducers/rootReducer'
import {AuthContext} from '../../../context/AuthContext'
import {
    addDialogMessage,
    getDialogMessages,
    getDialogUsers,
    setWritingUsers
} from '../../../redux/actions/messageActions'
import {Message} from '../../../models/messageModel'

interface Props {
    users: Array<User>
    dialogUser: User
    writingUsers: Array<number>
    messages: Array<Message>
    getDialogMessages: (dialogUser: User) => void
    addDialogMessage: (message: Message) => void
    setWritingUsers: (payload: Message) => void
    getDialogUsers: () => void
}

/**
 * Сообщения. Оболочка
 */
const MessagesWrapper: React.FC<Props> = ({users, writingUsers, setWritingUsers, getDialogMessages, messages, getDialogUsers, addDialogMessage, dialogUser}) => {
    const {isAuth} = useContext(AuthContext)

    const getMessages = (dialogUser: User) => getDialogMessages(dialogUser)

    useEffect(() => {
        getDialogUsers()
    }, [getDialogUsers])

    return isAuth
        ? <Messages users={users}
                    writingUsers={writingUsers}
                    messages={messages}
                    dialogUser={dialogUser}
                    setWritingUsers={setWritingUsers}
                    addDialogMessage={addDialogMessage}
                    getMessages={getMessages}/>
        : <Spinner/>
}

const mapStateToProps = (state: RootState) => {
    return {
        users: state.messagesData.usersList,
        messages: state.messagesData.dialogMessages,
        writingUsers: state.messagesData.writingUsers,
        dialogUser: state.messagesData.dialogUser
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getDialogMessages: (dialogUser: User) => dispatch(getDialogMessages(dialogUser)),
        addDialogMessage: (message: Message) => dispatch(addDialogMessage(message)),
        getDialogUsers: () => dispatch(getDialogUsers()),
        setWritingUsers: (payload: Message) => dispatch(setWritingUsers(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessagesWrapper)