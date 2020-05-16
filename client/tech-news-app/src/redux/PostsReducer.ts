import PostAPI from "../api/PostAPI";
import {
    ChangeSectionAction,
    Post,
    PostAction,
    PostInitial,
    PostState,
    SetPostCountAction,
    SetPostDataAction,
    SetPostIdAction,
    SetPostPageAction,
    SetPostsAction
} from "../models/PostModel";
import {ErrorResponse} from "../models/ResponseModel";
import history from "../history";
import {Dispatch} from "redux";
import {getSectionName} from '../common/Const'

const CHANGE_SECTION = 'CHANGE-SECTION'
const SET_POST_ID = 'SET-POST-ID'
const SET_POSTS_COUNT = 'SET-POSTS-COUNT'
const SET_POST_PAGE = 'SET-POST-PAGE'
const SET_POST_DATA = 'SET-POST-DATA'
const SET_POSTS = 'SET-POSTS'


const initialState: PostState = {
    sectionId: 1,
    postsCount: 0,
    postPage: 1,
    postData: PostInitial,
    postId: 0,
    postList: []
}

export const postsReducer = (state: PostState = initialState, action: PostAction): PostState => {
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

export const getPosts = (sectionId: number, postPage: number = 1): any => {
    return (dispatch: Dispatch) => {
        PostAPI.getPosts(getSectionName(sectionId), postPage)
            .then(data => {
                dispatch(setPostsAction(data.posts))
                dispatch(setPostsCountAction(data.postsCount))
            })
            .catch((error: ErrorResponse) => history.push(`/error/${error.code}`))
    }
}

export const setPostPageAndGetPosts = (sectionId: number, postPage: number): any => {
    return (dispatch: Dispatch) => {
        dispatch(setPostPageAction(postPage))

        PostAPI.getPosts(getSectionName(sectionId), postPage)
            .then(data => {
                dispatch(setPostsAction(data.posts))
                dispatch(setPostsCountAction(data.postsCount))
            })
            .catch((error: ErrorResponse) => history.push(`/error/${error.code}`))
    }
}

export const getPostData = (sectionId: number, postId: number): any => {
    return (dispatch: Dispatch) => {
        dispatch(setPostData(PostInitial))

        PostAPI.getPostData(sectionId, postId)
            .then((data: Post) => dispatch(setPostData(data)))
            .catch((error: ErrorResponse) => history.push(`/error/${error.code}`))
    }
}

export const chooseSectionAction = (sectionId: number): ChangeSectionAction => ({
    type: CHANGE_SECTION,
    sectionId: sectionId
});
export const setPostsAction = (posts: Array<Post>): SetPostsAction => ({type: SET_POSTS, posts: posts});
export const setPostsCountAction = (count: number): SetPostCountAction => ({type: SET_POSTS_COUNT, postsCount: count});
export const setPostPageAction = (postPageNumber: number = 1): SetPostPageAction => ({
    type: SET_POST_PAGE,
    postPage: postPageNumber
});
export const setPostIdAction = (id: number): SetPostIdAction => ({type: SET_POST_ID, postId: id});
export const setPostData = (data: Post): SetPostDataAction => ({type: SET_POST_DATA, postData: data});

