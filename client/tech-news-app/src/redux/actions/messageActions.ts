import {
    AddDialogMessageAction,
    DialogUser,
    Message,
    SetDialogMessagesAction,
    SetDialogUserAction,
    SetDialogUsersAction,
    SetWritingUsersAction
} from '../../models/MessageModel'
import {User} from '../../models/UserModel'

export const SET_DIALOG_USER = 'SET-DIALOG-USER'
export const SET_DIALOG_MESSAGES = 'SET-DIALOG-MESSAGES'
export const GET_DIALOG_MESSAGES = 'GET-DIALOG-MESSAGES'
export const READ_DIALOG_MESSAGES = 'READ-DIALOG-MESSAGES'
export const SET_DIALOG_USERS = 'SET-DIALOG-USERS'
export const GET_DIALOG_USERS = 'GET-DIALOG-USERS'
export const ADD_DIALOG_MESSAGE = 'ADD-DIALOG-MESSAGE'
export const SET_WRITING_USERS = 'SET-WRITING-USERS'

export const setDialogMessages = (dialogMessages: Array<Message>): SetDialogMessagesAction => ({
    type: SET_DIALOG_MESSAGES,
    dialogMessages
})

export const getDialogMessages = (user: User) => ({
    type: GET_DIALOG_MESSAGES,
    user
})

export const readDialogMessages = (user: User) => ({
    type: READ_DIALOG_MESSAGES,
    user
})

export const setDialogUsers = (users: Array<DialogUser>): SetDialogUsersAction => ({
    type: SET_DIALOG_USERS,
    users
})

export const getDialogUsers = () => ({
    type: GET_DIALOG_USERS
})

export const setDialogUser = (user: User): SetDialogUserAction => ({
    type: SET_DIALOG_USER,
    user
})
const setWritingUsersData = (users: Array<number>): SetWritingUsersAction => ({
    type: SET_WRITING_USERS,
    users
})

export const addDialogMessage = (message: Message): AddDialogMessageAction => ({
    type: ADD_DIALOG_MESSAGE,
    message
})

export const setWritingUsers = (payload: Message): ReturnType<typeof setWritingUsers> => (dispatch, getState) => {
    let users = [...getState().messagesData.writingUsers]
    if (payload.isWriting && !users.includes(payload.mainUserId)) {
        users.push(payload.mainUserId)
    } else if (!payload.isWriting && users.includes(payload.mainUserId)) {
        users = users.filter(userId => userId !== payload.mainUserId)
    }
    dispatch(setWritingUsersData(users))
}

export const setDialogUsersData = (msg: Message, userId: number): ReturnType<typeof setDialogUsersData> => (dispatch, getState) => {
    const dialogUsers: Array<DialogUser> = [...getState().messagesData.usersList]
    msg.isRead = false
    msg.id = Math.random()

    dialogUsers.filter(item => item.user.id === userId)[0].messages.push(msg)
    dispatch(setDialogUsers(dialogUsers))
}

