import {call, put, takeLatest, select} from '@redux-saga/core/effects'
import {
    GET_DIALOG_MESSAGES,
    GET_DIALOG_USERS, READ_DIALOG_MESSAGES,
    setDialogMessages,
    setDialogUser,
    setDialogUsers
} from '../actions/messageActions'
import MessageAPI from '../../api/MessageAPI'
import {DialogUser} from '../../models/MessageModel'
import {RootState} from '../reducers/rootReducer'

function* workerSetDialogUsers() {
    const response: Array<DialogUser> = yield call(MessageAPI.getDialogUsers)
    yield put(setDialogUsers(response))
}

function* workerSetDialogMessages(props) {
    yield put(setDialogUser(props.user))
    yield put(setDialogMessages([]))

    const messages = yield call(MessageAPI.getDialogMessages, props.user.id)
    yield put(setDialogMessages(messages))
}

function* workerReadDialogMessages(props) {
    const state: RootState = yield select()

    yield put(setDialogUser(props.user))
    yield put(setDialogMessages([]))

    const messages = yield call(MessageAPI.markMessagesToRead, props.user.id)

    const users = state.messagesData.usersList.map(item => {
        if (item.user.id === props.user.id)
            item.messages = []
        return item
    })
    yield put(setDialogMessages(messages))
    yield put(setDialogUsers(users))
}

export default function* messageSaga() {
    yield takeLatest(GET_DIALOG_MESSAGES, workerSetDialogMessages)
    yield takeLatest(READ_DIALOG_MESSAGES, workerReadDialogMessages)
    yield takeLatest(GET_DIALOG_USERS, workerSetDialogUsers)
}