import CommentAPI from "../api/CommentAPI";
import {NotificationManager} from "react-notifications";

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
            .then(data => {
                dispatch(setPostCommentsAction(data.comments));
            });
    };
};

export const sendNewPostComment = (postId, commentText, authorName, authorId) => {
    return () => {
        CommentAPI.sendNewPostComment(postId, commentText, authorName, authorId)
            .then(function (data) {

            })
            .catch(function (error) {
                NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось добавить комментарий');
            });
    };
};

export const likeComment = (postId, commentId, userId) => {
    return () => {
        CommentAPI.likeComment(postId, commentId, userId)
            .then(function (data) {

            })
            .catch(function (error) {
                NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось оценить комментарий');
            });
    };
};

export const deleteComment = (postId, commentId) => {
    return () => {
        CommentAPI.deleteComment(postId, commentId)
            .then(function (data) {

            })
            .catch(function (error) {
                NotificationManager.error('Произошла неизвестная ошибка', 'Не удалось удалить комментарий');
            });
    };
};
