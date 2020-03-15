import {getSectionName} from "../common/Const";
import {API_BASE_URL, request} from "./BaseRequest";

class CommentAPI {
    getPostComments(sectionId, postId) {
        return request({
            url: `${API_BASE_URL}/posts/${getSectionName(sectionId)}/post/${postId}/comments`,
            method: 'GET'
        })
    }

    sendNewPostComment(commentRequest) {
        return request({
            url: `${API_BASE_URL}/posts/post/${commentRequest.postId}/new-comment`,
            method: 'POST',
            body: JSON.stringify(commentRequest)
        })
    }

    likeComment(postId, commentId) {
        return request({
            url: `${API_BASE_URL}/posts/post/${postId}/like-comment?id=${commentId}`,
            method: 'GET'
        })
    }

    deleteComment(postId, commentId) {
        return request({
            url: `${API_BASE_URL}/posts/post/${postId}/delete-comment?id=${commentId}`,
            method: 'GET'
        })
    }

    updateComment(postId, commentId, commentText) {
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