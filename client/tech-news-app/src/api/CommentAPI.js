import * as axios from "axios";
import {getSectionName} from "../common/Const";

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {}
});

class CommentAPI {
    getPostComments(sectionId, postId) {
        return instance.get('posts/' + getSectionName(sectionId) + '/post/' + postId + '/comments')
            .then(response => response.data)
    };

    sendNewPostComment(postId, commentText) {
        return instance.post('/posts/post/' + postId + '/new_comment', {
            postId: postId,
            commentText: commentText,
            author: 'Admin Fadmin'
        })
            .then(response => response.data)
    };
}

export default new CommentAPI();