export interface Post {
    id: number
    title: string
    preDescription: string
    fullDescription: string
    authorId: number
    author: string
    date: Array<number>
    photoId: string
    categoryId: number
    editDate: Array<number>
    editAuthor: string
    editAuthorId: number
    commentsCount: number
    ratedUsers: Array<number>
    rates: Array<number>
}

export interface PostState {
    sectionId: number
    postsCount: number
    postPage: number
    postList: Array<Post>
    postId: number
    postData: Post
}

export type PostAction = ChangeSectionAction | SetPostIdAction |
    SetPostCountAction | SetPostPageAction | SetPostDataAction | SetPostsAction

export interface ChangeSectionAction {
    type: 'CHANGE-SECTION'
    sectionId: number
}

export interface SetPostIdAction {
    type: 'SET-POST-ID'
    postId: number
}

export interface SetPostCountAction {
    type: 'SET-POSTS-COUNT'
    postsCount: number
}

export interface SetPostPageAction {
    type: 'SET-POST-PAGE'
    postPage: number
}

export interface SetPostDataAction {
    type: 'SET-POST-DATA'
    postData: Post
}

export interface SetPostsAction {
    type: 'SET-POSTS'
    posts: Array<Post>
}

export const PostInitial: Post = {
    id: 0,
    title: 'INITIAL',
    preDescription: 'INITIAL',
    fullDescription: 'INITIAL',
    authorId: 0,
    author: 'INITIAL',
    date: [0, 0, 0],
    photoId: 'INITIAL',
    categoryId: 0,
    editDate: [0, 0, 0],
    editAuthor: 'INITIAL',
    editAuthorId: 0,
    commentsCount: 0,
    ratedUsers: [0, 0, 0],
    rates: [0, 0, 0]
}