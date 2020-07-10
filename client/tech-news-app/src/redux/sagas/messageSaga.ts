import {call, put, takeLatest} from '@redux-saga/core/effects'
import {
    GET_DIALOG_MESSAGES,
    GET_DIALOG_USERS,
    setDialogMessages,
    setDialogUser,
    setDialogUsers
} from '../actions/messageActions'
import MessageAPI from '../../api/MessageAPI'
import {DialogUser} from '../../models/MessageModel'

function* workerSetDialogUsers() {
    const response: Array<DialogUser> = yield call(MessageAPI.getDialogUsers)
    yield put(setDialogUsers(response))
}

function* workerSetDialogComments(props) {
    yield put(setDialogUser(props.user))
    yield put(setDialogMessages([]))

    const messages = yield call(MessageAPI.getDialogMessages, props.user.id)
    yield put(setDialogMessages(messages))
}

export default function* messageSaga() {
    yield takeLatest(GET_DIALOG_MESSAGES, workerSetDialogComments)
    yield takeLatest(GET_DIALOG_USERS, workerSetDialogUsers)
}