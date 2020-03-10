import CommentAPI from "../api/CommentAPI";

const SET_POST_COMMENTS = 'SET-POST-COMMENTS';

let initialState = {
    postComments: {},
    commentsCount: 0
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POST_COMMENTS: {
            return {
                ...state,
                postComments: action.postComments,
                commentsCount: action.commentsCount
            }
        }
        default:
            return state;
    }
}

export const setPostCommentsAction = (comments, commentsCount) => ({
    type: SET_POST_COMMENTS,
    postComments: comments,
    commentsCount
})

export const getPostComments = (sectionId, postId) => {
    return (dispatch) => {
        CommentAPI.getPostComments(sectionId, postId)
            .then(data => {
                dispatch(setPostCommentsAction(data.comments, data.commentsCount));
            })
    }
}
