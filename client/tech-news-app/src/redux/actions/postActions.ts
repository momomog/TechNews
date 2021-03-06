import PostAPI from '../../api/PostAPI'
import {
    ChangeSectionAction,
    Post,
    SetIsLoadingAction,
    SetPostCountAction,
    SetPostDataAction,
    SetPostPageAction,
    SetPostsAction
} from '../../models/PostModel'
import history from '../../history'
import {Dispatch} from 'redux'
import {getSectionName} from '../../common/Const'

export const CHANGE_SECTION = 'CHANGE-SECTION'
export const SET_POSTS_COUNT = 'SET-POSTS-COUNT'
export const SET_POST_PAGE = 'SET-POST-PAGE'
export const SET_POST_DATA = 'SET-POST-DATA'
export const SET_POSTS = 'SET-POSTS'
export const SET_IS_LOADING = 'SET-IS-LOADING'

export const changeSection = (sectionId: number): ChangeSectionAction => ({
    type: CHANGE_SECTION,
    sectionId
})

export const setPosts = (posts: Array<Post>): SetPostsAction => ({
    type: SET_POSTS,
    posts
})

export const setPostsCount = (count: number): SetPostCountAction => ({
    type: SET_POSTS_COUNT,
    postsCount: count
})

export const setPostPage = (postPageNumber = 1): SetPostPageAction => ({
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

export const getPosts = (sectionId: number, postPage = 1, setPage = false): ReturnType<typeof getPosts> => async (dispatch: Dispatch) => {
    try {
        if (setPage)
            dispatch(setPostPage(postPage))
        else
            dispatch(setIsLoading(true))

        const resp = await PostAPI.getPosts(getSectionName(sectionId), postPage)
        dispatch(setPosts(resp.posts))
        dispatch(setPostsCount(resp.postsCount))
    } catch (error) {
        history.push(`/error/${error.code}`)
    } finally {
        dispatch(setIsLoading(false))
    }
}

export const getPostById = (postId: number): ReturnType<typeof getPostById> => async (dispatch: Dispatch) => {
    try {
        const post = await PostAPI.getPostById(postId)
        dispatch(setPostData(post))
    } catch (error) {
        history.push(`/error/${error.code}`)
    }
}

