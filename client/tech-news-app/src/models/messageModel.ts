import {User} from './UserModel'

export interface Message {
    id: number
    oneUserId: number
    oneUserFirstName: string
    oneUserUsername: string
    oneUserPhotoId: string
    twoUserId: number
    twoUserFirstName: string
    twoUserUsername: string
    twoUserPhotoId: string
    date: string
    text: string
    new?: boolean
    isWriting?: boolean
}

export interface MessageState {
    dialogUser: User
    dialogMessages: Array<Message>
    usersList: Array<User>
    writingUsers: Array<number>
}

export type MessageAction = SetDialogUserAction | SetDialogMessagesAction | SetDialogUsersAction | AddDialogMessageAction | SetWritingUsersAction

export interface SetDialogUserAction {
    type: 'SET-DIALOG-USER'
    user: User
}
export interface SetDialogMessagesAction {
    type: 'SET-DIALOG-MESSAGES'
    dialogMessages: Array<Message>
}
export interface SetDialogUsersAction {
    type: 'SET-DIALOG-USERS'
    users: Array<User>
}
export interface AddDialogMessageAction {
    type: 'ADD-DIALOG-MESSAGE'
    message: Message
}
export interface SetWritingUsersAction {
    type: 'SET-WRITING-USERS'
    payload: Message
}