import {PostAction, PostInitial, PostState} from '../../models/PostModel'
import {
    CHANGE_SECTION,
    SET_POST_DATA,
    SET_POST_PAGE,
    SET_POSTS,
    SET_POSTS_COUNT
} from '../actions/postActions'


const initialState: PostState = {
    sectionId: 1,
    postsCount: 0,
    postPage: 1,
    postData: PostInitial,
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
        default:
            return state
    }
}