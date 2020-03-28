export interface SignInRequest {
    usernameOrEmail: string
    password: string
    remember?: boolean
}

export interface SignUpRequest {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}

export interface NewCommentRequest {
    postId?: number
    commentText: string
    parentCommentId?: number
    parentCommentAuthorName?: string
}

export interface PostRequest {
    title: string
    preDescription: string
    fullDescription: string
    categoryId: number
    photo?: File
}

export interface ProfileRequest {
    firstName: string
    lastName: string
    country?: string
    city?: string
    vk?: string
    instagram?: string
    facebook?: string
    twitter?: string
    birthDate: Date
}