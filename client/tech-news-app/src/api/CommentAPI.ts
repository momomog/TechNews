import {request} from './BaseRequest'
import {NewCommentRequest} from '../models/RequestsModel'
import {PostCommentsResponse} from '../models/ResponseModel'

class CommentAPI {
    /**
     * Получение списка комментариев поста
     */
    getPostComments = (sectionName: string, postId: number): Promise<PostCommentsResponse> => request({
        url: `posts/${sectionName}/post/${postId}/comments`
    })

    /**
     * Новый комментарий
     */
    sendNewPostComment = (commentRequest: NewCommentRequest): Promise<boolean> => request({
        url: `posts/post/${commentRequest.postId}/new-comment`,
        method: 'POST',
        body: JSON.stringify(commentRequest)
    })

    /**
     * Оценка комментария
     */
    likeComment = (postId: number, commentId: number): Promise<boolean> => request({
        url: `posts/post/${postId}/like-comment?id=${commentId}`
    })

    /**
     * Удаление комментария
     */
    deleteComment = (postId: number, commentId: number): Promise<boolean> => request({
        url: `posts/post/${postId}/delete-comment?id=${commentId}`
    })

    /**
     * Обновление комментария
     */
    updateComment = (postId: number, commentId: number, commentText: string): Promise<boolean> => request({
        url: `posts/post/${postId}/update-comment?id=${commentId}`,
        method: 'POST',
        body: JSON.stringify({commentText})
    })
}

export default new CommentAPI()