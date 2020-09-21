import {PostAction, PostInitial, PostState} from '../../models/PostModel'
import {
    CHANGE_SECTION, SET_IS_LOADING,
    SET_POST_DATA,
    SET_POST_PAGE,
    SET_POSTS,
    SET_POSTS_COUNT
} from '../actions/postActions'


 export const initialState: PostState = {
    sectionId: 1,            // Активная секция новостей
    postsCount: 0,           // Общее количество постов секции
    postPage: 1,             // Активная вкладка пагинатора
    postData: PostInitial,   // Данные просматриваемого поста
    postList: [],            // Список постов секции
    isLoading: false         // Флаг загрузки постов
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
        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default:
            return state
    }
}