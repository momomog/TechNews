import PostAPI from "../api/PostAPI";
import {NotificationManager} from "react-notifications";

const SET_POST_ID = 'SET-POST-ID';
const SET_POSTS_COUNT = 'SET-POSTS-COUNT';
const SET_POST_PAGE = 'SET-POST-PAGE';
const SET_POST_DATA = 'SET-POST-DATA';
const SET_POSTS = 'SET-POSTS';


let initialState = {
    postList: [],
    postData: {},
    postId: '',
    postsCount: 0,
    postPage: 1
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS: {
            return {
                ...state,
                postList: action.posts
            };
        }
        case SET_POSTS_COUNT: {
            return {
                ...state,
                postsCount: action.postsCount
            };
        }
        case SET_POST_PAGE: {
            return {
                ...state,
                postPage: action.postPage
            };
        }
        case SET_POST_DATA: {
            return {
                ...state,
                postData: action.postData
            };
        }
        case SET_POST_ID: {
            return {
                ...state,
                postId: action.postId
            };
        }
        default:
            return state;
    }
};

export const getAllPosts = (sectionId, postPage) => {
    return (dispatch) => {
        PostAPI.getAllPosts(sectionId, postPage).then(data => {
            dispatch(setPostsAction(data.posts));
            dispatch(setPostsCountAction(data.postsCount));
        });
    };
};

export const setPostPageAndGetPosts = (sectionId, postPage) => {
    return (dispatch) => {
        dispatch(setPostPageAction(postPage));
        PostAPI.getAllPosts(sectionId, postPage).then(data => {
            dispatch(setPostsAction(data.posts));
            dispatch(setPostsCountAction(data.postsCount));
        });
    };
};

export const getPostData = (sectionId, postId) => {
    return (dispatch) => {
        PostAPI.getPostData(sectionId, postId)
            .then(data => {
                dispatch(setPostDataAction(data));
            });
    };
};

export const deletePostById = (postId) => {
    return (dispatch) => {
        PostAPI.deletePostById(postId)
            .then(response => {
                NotificationManager.success(`Пост номер ${postId} успешно удален`, 'Успешно');
            })
            .catch(function (error) {
                NotificationManager.error(`Не удалось удалить пост номер ${postId}`, 'Ошибка');
            });
    };
};

export const setPostsAction = (posts) => ({type: SET_POSTS, posts: posts});
export const setPostsCountAction = (count) => ({type: SET_POSTS_COUNT, postsCount: count});
export const setPostPageAction = (postPageNumber) => ({type: SET_POST_PAGE, postPage: postPageNumber});
export const setPostIdAction = (id) => ({type: SET_POST_ID, postId: id});
export const setPostDataAction = (data) => ({type: SET_POST_DATA, postData: data});

