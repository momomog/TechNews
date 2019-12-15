import {getSectionName} from "../common/Const";
import {API_BASE_URL, request} from "./BaseRequest";

class CommentAPI {
    getPostComments(sectionId, postId) {
        return request({
            url: API_BASE_URL + '/posts/' + getSectionName(sectionId) + '/post/' + postId + '/comments',
            method: 'GET'
        });
    };

    sendNewPostComment(commentRequest) {
        return request({
            url: API_BASE_URL + '/posts/post/' + commentRequest.postId + '/new_comment',
            method: 'POST',
            body: JSON.stringify(commentRequest)
        });
    };

    likeComment(postId, commentId, userId) {
        return request({
            url: API_BASE_URL + '/posts/post/' + postId + '/like_comment',
            method: 'POST',
            body: JSON.stringify({
                commentId: commentId,
                userId: userId
            })
        });
    };

    deleteComment(postId, commentId) {
        return request({
            url: API_BASE_URL + '/posts/post/' + postId + '/delete_comment?id=' + commentId,
            method: 'GET'
        });
    };

    updateComment(postId, commentId, commentText) {
        debugger;
        return request({
            url: API_BASE_URL + '/posts/post/' + postId + '/update_comment?id=' + commentId,
            method: 'POST',
            body: JSON.stringify({
                commentText: commentText
            })
        });
    };
}

export default new CommentAPI();