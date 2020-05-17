import {request} from './BaseRequest'
import {NewCommentRequest} from '../models/RequestsModel'
import {PostCommentsResponse} from '../models/ResponseModel'

class CommentAPI {
    /**
     * Получение списка комментариев поста
     * @param sectionName
     * @param postId
     */
    getPostComments = (sectionName: string, postId: number): Promise<PostCommentsResponse> => request({
        url: `posts/${sectionName}/post/${postId}/comments`
    })

    /**
     * Новый комментарий
     * @param commentRequest
     */
    sendNewPostComment = (commentRequest: NewCommentRequest): Promise<boolean> => request({
        url: `posts/post/${commentRequest.postId}/new-comment`,
        method: 'POST',
        body: JSON.stringify(commentRequest)
    })

    /**
     * Оценка комментария
     * @param postId
     * @param commentId
     */
    likeComment = (postId: number, commentId: number): Promise<boolean> => request({
        url: `posts/post/${postId}/like-comment?id=${commentId}`
    })

    /**
     * Удаление комментария
     * @param postId
     * @param commentId
     */
    deleteComment = (postId: number, commentId: number): Promise<boolean> => request({
        url: `posts/post/${postId}/delete-comment?id=${commentId}`
    })

    /**
     * Обновление комментария
     * @param postId
     * @param commentId
     * @param commentText
     */
    updateComment = (postId: number, commentId: number, commentText: string): Promise<boolean> => request({
        url: `posts/post/${postId}/update-comment?id=${commentId}`,
        method: 'POST',
        body: JSON.stringify({commentText})
    })
}

export default new CommentAPI()