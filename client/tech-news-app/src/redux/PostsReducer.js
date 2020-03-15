import PostAPI from "../api/PostAPI";

const CHANGE_SECTION = 'CHANGE-SECTION';
const SET_POST_ID = 'SET-POST-ID';
const SET_POSTS_COUNT = 'SET-POSTS-COUNT';
const SET_POST_PAGE = 'SET-POST-PAGE';
const SET_POST_DATA = 'SET-POST-DATA';
const SET_POSTS = 'SET-POSTS';


let initialState = {
    sectionId: 1,
    postList: [],
    postData: {},
    postId: '',
    postsCount: 0,
    postPage: 1
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SECTION: {
            return {
                ...state,
                sectionId: action.sectionId
            }
        }
        case SET_POSTS: {
            return {
                ...state,
                postList: action.posts
            }
        }
        case SET_POSTS_COUNT: {
            return {
                ...state,
                postsCount: action.postsCount
            }
        }
        case SET_POST_PAGE: {
            return {
                ...state,
                postPage: action.postPage
            }
        }
        case SET_POST_DATA: {
            return {
                ...state,
                postData: action.postData
            }
        }
        case SET_POST_ID: {
            return {
                ...state,
                postId: action.postId
            }
        }
        default:
            return state
    }
}

export const getAllPosts = (sectionId, postPage = 1) => {
    return (dispatch) => {
        PostAPI.getAllPosts(sectionId, postPage).then(data => {
            dispatch(setPostsAction(data.posts));
            dispatch(setPostsCountAction(data.postsCount));
        })
    }
}

export const setPostPageAndGetPosts = (sectionId, postPage) => {
    return (dispatch) => {
        dispatch(setPostPageAction(postPage));
        PostAPI.getAllPosts(sectionId, postPage).then(data => {
            dispatch(setPostsAction(data.posts));
            dispatch(setPostsCountAction(data.postsCount));
        })
    }
}

export const getPostData = (sectionId, postId) => {
    return (dispatch) => {
        PostAPI.getPostData(sectionId, postId)
            .then(data => {
                dispatch(setPostData(data))
            })
    }
}

export const chooseSectionAction = sectionId => ({type: CHANGE_SECTION, sectionId: sectionId});
export const setPostsAction = posts => ({type: SET_POSTS, posts: posts});
export const setPostsCountAction = count => ({type: SET_POSTS_COUNT, postsCount: count});
export const setPostPageAction = (postPageNumber = 1) => ({type: SET_POST_PAGE, postPage: postPageNumber});
export const setPostIdAction = id => ({type: SET_POST_ID, postId: id});
export const setPostData = data => ({type: SET_POST_DATA, postData: data});

