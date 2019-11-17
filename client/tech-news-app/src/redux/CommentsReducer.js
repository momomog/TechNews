import CommentAPI from "../api/CommentAPI";

const CHANGE_COMMENT_TEXT = 'CHANGE-COMMENT-TEXT';
const SET_POST_COMMENTS = 'SET-POST-COMMENTS';

let initialState = {
    postComments: {},
    commentText: ''
};

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POST_COMMENTS: {
            return {
                ...state,
                postComments: action.postComments
            };
        }
        case CHANGE_COMMENT_TEXT: {
            return {
                ...state,
                commentText: action.commentText
            };
        }
        default:
            return state;
    }
};

export const setPostCommentsAction = (comments) => ({type: SET_POST_COMMENTS, postComments: comments});
export const changeCommentTextAction = (text) => ({type: CHANGE_COMMENT_TEXT, commentText: text});

export const getPostComments = (sectionId, postId) => {
    return (dispatch) => {
        CommentAPI.getPostComments(sectionId, postId)
            .then( data => {
                dispatch(setPostCommentsAction(data.comments));
            });
    };
};

export const sendNewPostComment = (postId, commentText) => {
    return () => {
        CommentAPI.sendNewPostComment(postId, commentText)
            .then(function (data) {
                // console.log(data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    };
};
