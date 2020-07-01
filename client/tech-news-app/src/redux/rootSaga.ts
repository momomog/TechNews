import {all} from '@redux-saga/core/effects'
import messageSaga from './sagas/messageSaga'
import {commentSaga} from './sagas/commentSaga'


export default function* rootSaga() {
    yield all([
        commentSaga(),
        messageSaga()
    ])
}