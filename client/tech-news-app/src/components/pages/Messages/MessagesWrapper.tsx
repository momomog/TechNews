import React, {useContext, useEffect} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import Messages from './Messages'
import {User} from '../../../models/UserModel'
import Spinner from '../../core/Spinner'
import {RootState} from '../../../redux/reducers/rootReducer'
import {AuthContext} from '../../../context/AuthContext'
import {getDialogMessages, getDialogUsers} from '../../../redux/actions/messageActions'
import {DialogUser, Message} from '../../../models/MessageModel'

interface Props {
    users: Array<DialogUser>
    dialogUser: User
    writingUsers: Array<number>
    messages: Array<Message>
    getDialogMessages: (dialogUser: User) => void
    getDialogUsers: () => void
}

/**
 * Сообщения. Оболочка
 * @param users
 * @param writingUsers
 * @param getDialogMessages
 * @param messages
 * @param getDialogUsers
 * @param dialogUser
 */
const MessagesWrapper: React.FC<Props> = ({users, writingUsers, getDialogMessages, messages, getDialogUsers, dialogUser}) => {
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
        getDialogUsers: () => dispatch(getDialogUsers())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessagesWrapper)