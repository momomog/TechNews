import {MessageAction, MessageState} from '../../models/messageModel'
import {ADD_DIALOG_MESSAGE, SET_DIALOG_MESSAGES, SET_DIALOG_USER, SET_DIALOG_USERS} from '../actions/messageActions'
import {UserInitial} from '../../models/UserModel'

const initialState: MessageState = {
    dialogUser: UserInitial,
    dialogMessages: [],
    usersList: []
}

export const messagesReducer = (state: MessageState = initialState, action: MessageAction) => {
    switch (action.type) {
        case SET_DIALOG_MESSAGES: {
            return {
                ...state,
                dialogMessages: action.dialogMessages
            }
        }
        case SET_DIALOG_USERS: {
            return {
                ...state,
                usersList: action.users
            }
        }
        case SET_DIALOG_USER: {
            return {
                ...state,
                dialogUser: action.user
            }
        }
        case ADD_DIALOG_MESSAGE: {
            return {
                ...state,
                dialogMessages: [...state.dialogMessages, action.message]
            }
        }
        default:
            return state
    }
}