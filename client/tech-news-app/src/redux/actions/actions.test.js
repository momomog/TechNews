import {getCurrentUserData, login, SET_IS_AUTH, SET_USER_DATA, setIsAuthAction, setUserDataAction} from "./userActions";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import {API_BASE_URL} from "../../api/BaseRequest";
import {SET_POST_COMMENTS, setPostComments} from "./commentActions";

const mockStore = configureMockStore([thunk])

/**
 * *****************************************************************
 * User actions
 * *****************************************************************
 */
describe('Sync user actions:', () => {
    test('SET_IS_AUTH', () => {
        expect(setIsAuthAction(true)).toEqual({
            type: SET_IS_AUTH,
            isAuth: true
        })
    })

    test('SET_USER_DATA', () => {
        expect(setUserDataAction({id: 23})).toEqual({
            type: SET_USER_DATA,
            userData: {id: 23}
        })
    })
})

describe('Async user actions:', () => {
    afterAll(() => {
        fetchMock.reset()
        fetchMock.restore()
    })
    test('Login action', function () {
        fetchMock.postOnce(`${API_BASE_URL}/auth/signin`, {
            headers: {'content-type': 'application/json'},
            body: {success: true}
        })

        const expectedActions = [setIsAuthAction(true)]
        const store = mockStore({})

        return store.dispatch(login({})).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    test('GetCurrentUserData action', function () {
        fetchMock.getOnce(`${API_BASE_URL}/user/me`, {
            headers: {'content-type': 'application/json'},
            body: {id: 35}
        })

        const expectedActions = [setUserDataAction({id: 35})]
        const store = mockStore({})

        return store.dispatch(getCurrentUserData()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });
})

/**
 * *****************************************************************
 * Comment actions
 * *****************************************************************
 */
describe('Sync comment actions:', () => {
    test('SET_POST_COMMENTS', () => {
        const data = {
            comments: [1, 2, 3],
            count: 3
        }
        expect(setPostComments(data.comments, data.count)).toEqual({
            type: SET_POST_COMMENTS,
            postComments: [1, 2, 3],
            commentsCount: 3
        })
    })
})

// describe('Async comment actions:', () => {
//     afterAll(() => {
//         fetchMock.reset()
//         fetchMock.restore()
//     })
//
//     test('GetPostComments action', function () {
//         fetchMock.getOnce(`${API_BASE_URL}/posts/1/post/1/comments`, {
//             headers: {'content-type': 'application/json'},
//             body: {comments: [1, 2, 3], commentsCount: 3}
//         })
//
//         const expectedActions = [setPostComments([1, 2, 3], 3)]
//         const store = mockStore({})
//
//         return store.dispatch(getPostComments(2, 2)).then(() => {
//             expect(store.getActions()).toEqual(expectedActions)
//         })
//     });
// })