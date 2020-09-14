import PostAPI from '../../api/PostAPI'
import {
    ChangeSectionAction,
    Post, SetIsLoadingAction,
    SetPostCountAction,
    SetPostDataAction,
    SetPostPageAction,
    SetPostsAction
} from '../../models/PostModel'
import {ErrorResponse} from '../../models/ResponseModel'
import history from '../../history'
import {Dispatch} from 'redux'
import {getSectionName} from '../../common/Const'

export const CHANGE_SECTION = 'CHANGE-SECTION'
export const SET_POSTS_COUNT = 'SET-POSTS-COUNT'
export const SET_POST_PAGE = 'SET-POST-PAGE'
export const SET_POST_DATA = 'SET-POST-DATA'
export const SET_POSTS = 'SET-POSTS'
export const SET_IS_LOADING = 'SET-IS-LOADING'


export const getPosts = (sectionId: number, postPage: number = 1, setPage: boolean = false): any => (dispatch: Dispatch) => {
    if (setPage)
        dispatch(setPostPageAction(postPage))
    else
        dispatch(setIsLoading(true))

    PostAPI.getPosts(getSectionName(sectionId), postPage)
        .then(data => {
            dispatch(setPostsAction(data.posts))
            dispatch(setPostsCountAction(data.postsCount))
        })
        .catch((error: ErrorResponse) => history.push(`/error/${error.code}`))
        .finally(() => dispatch(setIsLoading(false)))
}

export const getPostById = (postId: number): any => (dispatch: Dispatch) => {
    PostAPI.getPostById(postId)
        .then((data: Post) => dispatch(setPostData(data)))
        .catch((error: ErrorResponse) => history.push(`/error/${error.code}`))
}

export const changeSection = (sectionId: number): ChangeSectionAction => ({
    type: CHANGE_SECTION,
    sectionId: sectionId
})

export const setPostsAction = (posts: Array<Post>): SetPostsAction => ({
    type: SET_POSTS,
    posts: posts
})

export const setPostsCountAction = (count: number): SetPostCountAction => ({
    type: SET_POSTS_COUNT,
    postsCount: count
})

export const setPostPageAction = (postPageNumber: number = 1): SetPostPageAction => ({
    type: SET_POST_PAGE,
    postPage: postPageNumber
})

export const setPostData = (data: Post): SetPostDataAction => ({
    type: SET_POST_DATA,
    postData: data
})

export const setIsLoading = (isLoading: boolean): SetIsLoadingAction => ({
    type: SET_IS_LOADING,
    isLoading
})

