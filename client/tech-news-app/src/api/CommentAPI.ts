import {getSectionName} from "../common/Const";
import {API_BASE_URL, request} from "./BaseRequest";
import {NewCommentRequest} from "../models/RequestsModel";
import {PostCommentsResponse} from "../models/ResponseModel";

class CommentAPI {
    getPostComments(sectionId: number, postId: number): Promise<PostCommentsResponse> {
        return request({
            url: `${API_BASE_URL}/posts/${getSectionName(sectionId)}/post/${postId}/comments`,
            method: 'GET'
        })
    }

    sendNewPostComment(commentRequest: NewCommentRequest): Promise<boolean> {
        return request({
            url: `${API_BASE_URL}/posts/post/${commentRequest.postId}/new-comment`,
            method: 'POST',
            body: JSON.stringify(commentRequest)
        })
    }

    likeComment(postId: number, commentId: number): Promise<boolean> {
        return request({
            url: `${API_BASE_URL}/posts/post/${postId}/like-comment?id=${commentId}`,
            method: 'GET'
        })
    }

    deleteComment(postId: number, commentId: number): Promise<boolean> {
        return request({
            url: `${API_BASE_URL}/posts/post/${postId}/delete-comment?id=${commentId}`,
            method: 'GET'
        })
    }

    updateComment(postId: number, commentId: number, commentText: string): Promise<boolean> {
        return request({
            url: `${API_BASE_URL}/posts/post/${postId}/update-comment?id=${commentId}`,
            method: 'POST',
            body: JSON.stringify({
                commentText: commentText
            })
        })
    }
}

export default new CommentAPI()