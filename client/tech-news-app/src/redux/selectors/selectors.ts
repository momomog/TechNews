import {createSelector} from 'reselect'
import {RootState} from '../reducers/rootReducer'

const selectPostData = (state: RootState) => state.postsData
const selectUserData = (state: RootState) => state.userData
const selectCommentsData = (state: RootState) => state.commentsData
const selectMessagesData = (state: RootState) => state.messagesData

export const postsDataSelector = createSelector(
    selectPostData,
    postData => postData
)

export const userDataSelector = createSelector(
    selectUserData,
    userData => userData
)

export const commentsDataSelector = createSelector(
    selectCommentsData,
    commentsData => commentsData
)

export const messagesDataSelector = createSelector(
    selectMessagesData,
    messagesData => messagesData
)