import {commentsReducer, initialState as commentInitialState} from "./commentsReducer";
import {SET_POST_COMMENTS} from "../actions/commentActions";
import {initialState as userInitialState, userReducer} from "./userReducer";
import {SET_IS_AUTH, SET_USER_DATA} from "../actions/userActions";
import {initialState as postsInitialState, postsReducer} from "./postsReducer";
import {initialState as messagesInitialState, messagesReducer} from "./messagesReducer";

import {
    CHANGE_SECTION,
    SET_IS_LOADING,
    SET_POST_DATA,
    SET_POST_PAGE,
    SET_POSTS,
    SET_POSTS_COUNT
} from "../actions/postActions";
import {
    ADD_DIALOG_MESSAGE,
    SET_DIALOG_MESSAGES,
    SET_DIALOG_USER,
    SET_DIALOG_USERS,
    SET_WRITING_USERS
} from "../actions/messageActions";
import {UserInitial} from "../../models/UserModel";

/**
 * *****************************************************************
 * Comment reducer
 * *****************************************************************
 */
describe('Comment reducer:', () => {
    let initial
    beforeEach(() => {
        initial = {...commentInitialState}
    })

    test('SET_POST_COMMENTS', () => {
        const action = {
            type: SET_POST_COMMENTS,
            postComments: [1, 2],
            commentsCount: 2
        }
        const res = {
            ...initial,
            postComments: [1, 2],
            commentsCount: 2
        }
        expect(commentsReducer(initial, action)).toEqual(res)
    })
})


/**
 * *****************************************************************
 * User reducer
 * *****************************************************************
 */
describe('User reducer:', () => {
    let initial
    beforeEach(() => {
        initial = {...userInitialState}
    })

    const getAuthResult = isAuth => ({
        ...initial,
        isAuth: isAuth
    })

    test('SET_IS_TRUTH_AUTH', () => {
        const action = {
            type: SET_IS_AUTH,
            isAuth: true
        }
        expect(userReducer(initial, action)).toMatchObject(getAuthResult(true))
    })

    test('SET_IS_FALSY_AUTH', () => {
        const initial = {
            isAuth: true,
            userData: UserInitial
        }
        let action = {
            type: SET_IS_AUTH,
            isAuth: false
        }
        expect(userReducer(initial, action)).toMatchObject(getAuthResult(false))
    })

    test('SET_USER_DATA', () => {
        let action = {
            type: SET_USER_DATA,
            userData: {id: 1, email: 'email'}
        }
        const result = {
            ...initial,
            userData: {id: 1, email: 'email'}
        }
        expect(userReducer(initial, action)).toEqual(result)
    })
})


/**
 * *****************************************************************
 * Posts reducer
 * *****************************************************************
 */
describe('Posts reducer:', () => {
    let initial
    beforeEach(() => {
        initial = {...postsInitialState}
    })

    test('CHANGE_SECTION', () => {
        const action = {
            type: CHANGE_SECTION,
            sectionId: 1
        }
        const result = {
            ...initial,
            sectionId: 1
        }
        expect(postsReducer(initial, action)).toEqual(result)
    })

    test('SET_POSTS', () => {
        const action = {
            type: SET_POSTS,
            posts: [1, 2, 3]
        }
        const result = {
            ...initial,
            postList: [1, 2, 3]
        }
        expect(postsReducer(initial, action)).toEqual(result)
    })

    test('SET_POSTS_COUNT', () => {
        const action = {
            type: SET_POSTS_COUNT,
            postsCount: 400
        }
        const result = {
            ...initial,
            postsCount: 400
        }
        expect(postsReducer(initial, action)).toEqual(result)
    })

    test('SET_POST_PAGE', () => {
        const action = {
            type: SET_POST_PAGE,
            postPage: 8
        }
        const result = {
            ...initial,
            postPage: 8
        }
        expect(postsReducer(initial, action)).toEqual(result)
    })

    test('SET_POST_DATA', () => {
        const action = {
            type: SET_POST_DATA,
            postData: {id: 100, title: 'title'}
        }
        const result = {
            ...initial,
            postData: {id: 100, title: 'title'}
        }
        expect(postsReducer(initial, action)).toEqual(result)
    })

    test('SET_IS_TRYTH_LOADING', () => {
        const action = {
            type: SET_IS_LOADING,
            isLoading: true
        }
        const result = {
            ...initial,
            isLoading: true
        }
        expect(postsReducer(initial, action)).toEqual(result)
    })

    test('SET_IS_FALSY_LOADING', () => {
        const initial = {
            ...postsInitialState,
            isLoading: true
        }
        const action = {
            type: SET_IS_LOADING,
            isLoading: false
        }
        const result = {
            ...initial,
            isLoading: false
        }
        expect(postsReducer(initial, action)).toEqual(result)
    })
})


/**
 * *****************************************************************
 * Messages reducer
 * *****************************************************************
 */
describe('Messages reducer:', () => {
    let initial
    beforeEach(() => {
        initial = {...messagesInitialState}
    })

    test('SET_DIALOG_MESSAGES', () => {
        const action = {
            type: SET_DIALOG_MESSAGES,
            dialogMessages: [1, 2, 3, 4]
        }
        const result = {
            ...initial,
            dialogMessages: [1, 2, 3, 4]
        }
        expect(messagesReducer(initial, action)).toEqual(result)
    })

    test('SET_DIALOG_USERS', () => {
        const action = {
            type: SET_DIALOG_USERS,
            users: [{id: 1}, {id: 2}]
        }
        const result = {
            ...initial,
            usersList: [{id: 1}, {id: 2}]
        }
        expect(messagesReducer(initial, action)).toEqual(result)
    })

    test('SET_DIALOG_USER', () => {
        const action = {
            type: SET_DIALOG_USER,
            user: {id: 23}
        }
        const result = {
            ...initial,
            dialogUser: {id: 23}
        }
        expect(messagesReducer(initial, action)).toEqual(result)
    })

    test('ADD_DIALOG_MESSAGE', () => {
        const action = {
            type: ADD_DIALOG_MESSAGE,
            message: {id: 23}
        }
        const result = {
            ...initial,
            dialogMessages: [...initial.dialogMessages, action.message]
        }
        expect(messagesReducer(initial, action)).toEqual(result)
    })

    test('SET_WRITING_USERS', () => {
        const action = {
            type: SET_WRITING_USERS,
            users: [{id: 33}, {id: 34}]
        }
        const result = {
            ...initial,
            writingUsers: [{id: 33}, {id: 34}]
        }
        expect(messagesReducer(initial, action)).toEqual(result)
    })
})