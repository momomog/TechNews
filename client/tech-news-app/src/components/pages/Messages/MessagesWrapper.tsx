import React, {useContext, useEffect} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import Messages from './Messages'
import {User} from '../../../models/UserModel'
import Spinner from '../../core/Spinner'
import {RootState} from '../../../redux/reducers/rootReducer'
import {AuthContext} from '../../../context/AuthContext'
import {addDialogMessage, getDialogMessages, getDialogUsers} from '../../../redux/actions/messageActions'
import {Message} from '../../../models/messageModel'

interface Props {
    users: Array<User>
    dialogUser: User
    messages: Array<Message>
    getDialogMessages: (dialogUser: User) => void
    addDialogMessage: (message: Message) => void
    getDialogUsers: () => void
}

/**
 * Сообщения. Оболочка
 */
const MessagesWrapper: React.FC<Props> = ({users, getDialogMessages, messages, getDialogUsers, addDialogMessage, dialogUser}) => {
    const {isAuth} = useContext(AuthContext)

    const getMessages = (dialogUser: User) => getDialogMessages(dialogUser)

    useEffect(() => {
        getDialogUsers()
    },[])

    return isAuth
        ? <Messages users={users}
                    messages={messages}
                    dialogUser={dialogUser}
                    addDialogMessage={addDialogMessage}
                    getMessages={getMessages}/>
        : <Spinner/>
}

const mapStateToProps = (state: RootState) => {
    return {
        users: state.messagesData.usersList,
        messages: state.messagesData.dialogMessages,
        dialogUser: state.messagesData.dialogUser
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getDialogMessages: (dialogUser: User) => dispatch(getDialogMessages(dialogUser)),
        addDialogMessage: (message: Message) => dispatch(addDialogMessage(message)),
        getDialogUsers: () => dispatch(getDialogUsers())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessagesWrapper)