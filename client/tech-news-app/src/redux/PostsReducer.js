import PostAPI from "../api/PostAPI";

const SET_CURRENT_POST_ID = 'SET-CURRENT-POST-ID';
const SET_POSTS_COUNT = 'SET-POSTS-COUNT';
const SET_CURRENT_POST_PAGE = 'SET-CURRENT-POST-PAGE';
const SET_CURRENT_POST_DATA = 'SET-CURRENT-POST-DATA';
const SET_POSTS = 'SET-POSTS';




let initialState = {
    postList: [],
    currentPostData: {},
    currentPostComments: {},
    currentPostId: '',
    postsCount: 0,
    currentPostPage: 1,
    currentCommentText: ''
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
        case SET_CURRENT_POST_PAGE: {
            return {
                ...state,
                currentPostPage: action.currentPostPage
            };
        }
        case SET_CURRENT_POST_DATA: {
            return {
                ...state,
                currentPostData: action.currentPostData
            };
        }
        case SET_CURRENT_POST_ID: {
            return {
                ...state,
                currentPostId: action.currentPostId
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
        dispatch(setCurrentPostPageAction(postPage));
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
                dispatch(setCurrentPostDataAction(data));
            });
    };
};

export const setPostsAction = (posts) => ({type: SET_POSTS, posts: posts});
export const setPostsCountAction = (count) => ({type: SET_POSTS_COUNT, postsCount: count});
export const setCurrentPostPageAction = (postPageNumber) => ({type: SET_CURRENT_POST_PAGE, currentPostPage: postPageNumber});
export const setCurrentPostIdAction = (id) => ({type: SET_CURRENT_POST_ID, currentPostId: id});

export const setCurrentPostDataAction = (data) => ({type: SET_CURRENT_POST_DATA, currentPostData: data});

