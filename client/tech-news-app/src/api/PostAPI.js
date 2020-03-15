import {getSectionName} from "../common/Const";
import {API_BASE_URL, request} from "./BaseRequest";
import AuthService from "../common/AuthService";

class PostAPI {
    getAllPosts(sectionId, postPage) {
        return request({
            url: `${API_BASE_URL}/posts/${getSectionName(sectionId)}/${postPage}`,
            method: 'GET'
        })
    }

    getRecommendedPosts(categoryId, postId) {
        return request({
            url: `${API_BASE_URL}/posts/${categoryId}/recommended?id=${postId}`,
            method: 'GET'
        })
    }

    getPostData(sectionId, postId) {
        return request({
            url: `${API_BASE_URL}/posts/post/${postId}`,
            method: 'GET'
        })
    }

    deletePostById(postId) {
        return request({
            url: `${API_BASE_URL}/posts/delete-post?id=${postId}`,
            method: 'GET'
        })
    }

    ratePost(postId, rate) {
        return request({
            url: `${API_BASE_URL}/posts/rate-post?id=${postId}`,
            method: 'POST',
            body: JSON.stringify({
                rate: rate
            })
        })
    }

    onCreateNewPost(postDataRequest, photoBody) {
        const formData = new FormData();
        formData.append('post', new Blob([JSON.stringify(postDataRequest)], {
            type: "application/json"
        }));

        if (photoBody)
            formData.append('photo', photoBody);
        else
            formData.append('photo', new Blob());

        const headers = new Headers({});

        if (AuthService.getToken())
            headers.append('Authorization', 'Bearer ' + AuthService.getToken())

        return request({
            url: `${API_BASE_URL}/posts/new-post`,
            method: 'POST',
            headers: headers,
            body: formData
        })
    }

    onUpdatePostData(postId, postDataRequest, photoBody) {
        const formData = new FormData();
        formData.append('post', new Blob([JSON.stringify(postDataRequest)], {
            type: "application/json"
        }));

        if (photoBody)
            formData.append('photo', photoBody);
        else
            formData.append('photo', new Blob());

        const headers = new Headers({});

        if (AuthService.getToken())
            headers.append('Authorization', 'Bearer ' + AuthService.getToken())

        return request({
            url: `${API_BASE_URL}/posts/post/update?id=${postId}`,
            method: 'POST',
            headers: headers,
            body: formData
        })
    }
}

export default new PostAPI()
