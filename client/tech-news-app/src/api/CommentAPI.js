import * as axios from "axios";
import {getSectionName} from "../common/Const";

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        Authorization: localStorage.getItem('accessToken') ? 'Bearer ' + localStorage.getItem('accessToken') : ''
    }
});

class CommentAPI {
    getPostComments(sectionId, postId) {
        return instance.get('posts/' + getSectionName(sectionId) + '/post/' + postId + '/comments')
            .then(response => response.data)
    };

    sendNewPostComment(postId, commentText, authorName, authorId) {
        return instance.post('/posts/post/' + postId + '/new_comment', {
            postId: postId,
            commentText: commentText,
            authorName: authorName,
            authorId: authorId
        }).then(response => response.data)
    };

    likeComment(postId, commentId, userId) {
        return instance.post('/posts/post/' + postId + '/like_comment', {
            commentId: commentId,
            userId: userId
        }).then(response => response.data)
    };
}

export default new CommentAPI();