import {Comment} from './CommentModel'
import {Post} from './PostModel'

export interface PostCommentsResponse {
    comments: Array<Comment>
    commentsCount: number
}

export interface PostsResponse {
    posts: Array<Post>
    postsCount: number
}

export interface SignInResponse {
    accessToken: string
    tokenType: string
}

export interface SignUpResponse {
    success: boolean
    message: string
}

export interface ErrorResponse {
    code: number
    message: string
}