export interface User {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    createAt: Array<number>
    commentsCount: number
    profileData: {
        country: string,
        city: string,
        vk: string,
        instagram: string,
        twitter: string,
        facebook: string,
        photoId: string,
        birthDate: Array<number>
    }
}

export interface UserState {
    isAuth: boolean
    currentUserData: User
    userData: User
}

export type UserAction = SetIsAuthAction | SetCurrentUserDataAction | SetUserDataAction

export interface SetIsAuthAction {
    type: 'SET-IS-AUTH'
    isAuth: boolean
}

export interface SetCurrentUserDataAction {
    type: 'SET-CURRENT-USER-DATA'
    currentUserData: User
}

export interface SetUserDataAction {
    type: 'SET-USER-DATA'
    userData: User
}

export const UserInitial: User = {
    id: 0,
    username: 'INITIAL',
    firstName: 'INITIAL',
    lastName: 'INITIAL',
    email: 'INITIAL',
    createAt: [0, 0, 0],
    commentsCount: 0,
    profileData: {
        country: 'INITIAL',
        city: 'INITIAL',
        vk: 'INITIAL',
        instagram: 'INITIAL',
        twitter: 'INITIAL',
        facebook: 'INITIAL',
        photoId: 'INITIAL',
        birthDate: [0, 0, 0]
    }
}