export interface Post {
    id: number
    title: string
    preDescription: string
    fullDescription: string
    authorId: number
    author: string
    date: string
    photoId: string
    categoryId: number
    editDate: string
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
    postData: Post
    isLoading: boolean
}

export type PostAction = ChangeSectionAction | SetPostCountAction |
    SetPostPageAction | SetPostDataAction | SetPostsAction | SetIsLoadingAction

export interface ChangeSectionAction {
    type: 'CHANGE-SECTION'
    sectionId: number
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

export interface SetIsLoadingAction {
    type: 'SET-IS-LOADING'
    isLoading: boolean
}

export interface SetPostsAction {
    type: 'SET-POSTS'
    posts: Array<Post>
}

export const PostInitial: Post = {
    id: 0,
    title: '',
    preDescription: '',
    fullDescription: '',
    authorId: 0,
    author: '',
    date: '',
    photoId: '',
    categoryId: 0,
    editDate: '',
    editAuthor: '',
    editAuthorId: 0,
    commentsCount: 0,
    ratedUsers: [0, 0, 0],
    rates: [0, 0, 0]
}