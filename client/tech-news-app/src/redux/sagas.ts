import {all, call, put, takeLatest} from '@redux-saga/core/effects'
import {GET_POST_COMMENTS, setPostComments} from './actions/commentActions'
import CommentAPI from '../api/CommentAPI'

//
// Тест react-saga для общего ознакомления с библиотекой
//

export function* workerSetComments(props) {
    const {sectionName, postId} = props
    const data = yield call(CommentAPI.getPostComments, sectionName, postId)
    yield put(setPostComments(data.comments, data.commentsCount))
}

export function* watchSetComments() {
    yield takeLatest(GET_POST_COMMENTS, workerSetComments)
}

export default function* rootSaga() {
    yield all([
        watchSetComments
    ])
}