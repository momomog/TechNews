export interface Comment {
    id: number
    commentText: string
    authorId: number
    authorName: string
    authorPhotoId: string
    date: string
    postId: number
    likes: Array<number>
    parentCommentId?: number
    parentCommentAuthorName?: string
    isDeleted: boolean
    replyComments: Array<Comment>
}

export interface CommentAction {
    type: 'SET-POST-COMMENTS'
    postComments: Array<Comment>
    commentsCount: number
}

export interface CommentState {
    postComments: Array<Comment>
    commentsCount: number
}

export interface CommentRequest {
    postId?: number
    commentText: string
    parentCommentId?: number
    parentCommentAuthorName?: string
}