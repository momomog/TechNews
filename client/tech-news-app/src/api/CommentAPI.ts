import {getSectionName} from "../common/Const";
import {request} from "./BaseRequest";
import {NewCommentRequest} from "../models/RequestsModel";
import {PostCommentsResponse} from "../models/ResponseModel";

class CommentAPI {
    getPostComments = (sectionId: number, postId: number): Promise<PostCommentsResponse> => request({
        url: `posts/${getSectionName(sectionId)}/post/${postId}/comments`
    })

    sendNewPostComment = (commentRequest: NewCommentRequest): Promise<boolean> => request({
        url: `posts/post/${commentRequest.postId}/new-comment`,
        method: 'POST',
        body: JSON.stringify(commentRequest)
    })

    likeComment = (postId: number, commentId: number): Promise<boolean> => request({
        url: `posts/post/${postId}/like-comment?id=${commentId}`
    })

    deleteComment = (postId: number, commentId: number): Promise<boolean> => request({
        url: `posts/post/${postId}/delete-comment?id=${commentId}`
    })

    updateComment = (postId: number, commentId: number, commentText: string): Promise<boolean> => request({
        url: `posts/post/${postId}/update-comment?id=${commentId}`,
        method: 'POST',
        body: JSON.stringify({commentText})
    })
}

export default new CommentAPI()