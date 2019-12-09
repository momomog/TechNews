import {getSectionName} from "../common/Const";
import {API_BASE_URL, request} from "./BaseRequest";

class CommentAPI {
    getPostComments(sectionId, postId) {
        return request({
            url: API_BASE_URL + '/posts/' + getSectionName(sectionId) + '/post/' + postId + '/comments',
            method: 'GET'
        });
    };

    sendNewPostComment(postId, commentText, authorName, authorId) {
        return request({
            url: API_BASE_URL + '/posts/post/' + postId + '/new_comment',
            method: 'POST',
            body: JSON.stringify({
                postId: postId,
                commentText: commentText,
                authorName: authorName,
                authorId: authorId
            })
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
}

export default new CommentAPI();