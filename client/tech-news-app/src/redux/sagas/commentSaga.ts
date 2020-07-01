import {call, put, takeLatest} from '@redux-saga/core/effects'
import CommentAPI from '../../api/CommentAPI'
import {GET_POST_COMMENTS, setPostComments} from '../actions/commentActions'

function* workerSetComments(props) {
    const {sectionName, postId} = props
    const data = yield call(CommentAPI.getPostComments, sectionName, postId)
    yield put(setPostComments(data.comments, data.commentsCount))
}

export function* commentSaga() {
    yield takeLatest(GET_POST_COMMENTS, workerSetComments)
}