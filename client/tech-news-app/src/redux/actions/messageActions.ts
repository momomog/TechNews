import {
    AddDialogMessageAction,
    Message,
    SetDialogMessagesAction,
    SetDialogUserAction,
    SetDialogUsersAction,
    SetWritingUsersAction
} from '../../models/messageModel'
import {User} from '../../models/UserModel'

export const SET_DIALOG_USER = 'SET-DIALOG-USER'
export const SET_DIALOG_MESSAGES = 'SET-DIALOG-MESSAGES'
export const GET_DIALOG_MESSAGES = 'GET-DIALOG-MESSAGES'
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

export const setDialogUsers = (users: Array<User>): SetDialogUsersAction => ({
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

export const setWritingUsers = (payload: Message): SetWritingUsersAction => ({
    type: SET_WRITING_USERS,
    payload
})

export const addDialogMessage = (message: Message): AddDialogMessageAction => ({
    type: ADD_DIALOG_MESSAGE,
    message
})


