export interface User {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
    createAt: Array<number>
    commentsCount: number
    profileData: {
        country: string
        city: string
        vk: string
        instagram: string
        twitter: string
        facebook: string
        photoId: string
        birthDate: Array<number>
    }
}

export interface UserState {
    isAuth: boolean
    userData: User
}

export type UserAction = SetIsAuthAction | SetUserDataAction

export interface SetIsAuthAction {
    type: 'SET-IS-AUTH'
    isAuth: boolean
}

export interface SetUserDataAction {
    type: 'SET-USER-DATA'
    userData: User
}

export const UserInitial: User = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    createAt: [0, 0, 0],
    commentsCount: 0,
    profileData: {
        country: '',
        city: '',
        vk: '',
        instagram: '',
        twitter: '',
        facebook: '',
        photoId: '',
        birthDate: [0, 0, 0]
    }
}