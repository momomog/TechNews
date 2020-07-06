import {Message, MessageAction, MessageState} from '../../models/MessageModel'
import {
    ADD_DIALOG_MESSAGE,
    SET_DIALOG_MESSAGES,
    SET_DIALOG_USER,
    SET_DIALOG_USERS,
    SET_WRITING_USERS
} from '../actions/messageActions'
import {UserInitial} from '../../models/UserModel'

const initialState: MessageState = {
    dialogUser: UserInitial,
    dialogMessages: [],
    usersList: [],
    writingUsers: []
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
        case SET_WRITING_USERS: {
            return {
                ...state,
                writingUsers: getWritingUsers(state.writingUsers, action.payload)
            }
        }
        default:
            return state
    }
}

function getWritingUsers(storeUsers: Array<number>, payload: Message) {
    let users = [...storeUsers]
    if (payload.isWriting && !users.includes(payload.mainUserId)) {
        users.push(payload.mainUserId)
    } else if (!payload.isWriting && users.includes(payload.mainUserId)) {
        users = users.filter(userId => userId !== payload.mainUserId)
    }
    return users
}