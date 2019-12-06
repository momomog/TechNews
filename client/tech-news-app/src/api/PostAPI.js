import {getSectionName} from "../common/Const";
import {API_BASE_URL, request} from "./BaseRequest";
import Common from "../common/Common";

class PostAPI {
    getAllPosts(sectionId, postPage) {
        return request({
            url: API_BASE_URL + '/posts/' + getSectionName(sectionId) + '/' + postPage,
            method: 'GET'
        });
    };

    getPostData(sectionId, postId) {
        return request({
            url: API_BASE_URL + '/posts/' + getSectionName(sectionId) + '/post/' + postId,
            method: 'GET'
        });
    };

    deletePostById(postId) {
        return request({
            url: API_BASE_URL + '/posts/delete-post?id=' + postId,
            method: 'GET'
        });
    };

    onUpdatePostData(postId, postDataRequest) {
        return request({
            url: API_BASE_URL + '/posts/post/update?id=' + postId,
            method: 'POST',
            body: JSON.stringify(postDataRequest)
        });
    };

    onCreateNewPost(postDataRequest, photoBody) {
        const formData = new FormData();
        formData.append('photo', photoBody);
        formData.append('postData', JSON.stringify(postDataRequest));
        const headers = new Headers({});

        if (Common.getToken()) {
            headers.append('Authorization', 'Bearer ' + Common.getToken());
        }

        return request({
            url: API_BASE_URL + '/posts/new-post',
            headers: headers,
            method: 'POST',
            body: formData
        });
    };

    onUpdatePostPhoto(postId, photoBody) {
        const formData = new FormData();
        formData.append('photo', photoBody);
        const headers = new Headers({});

        if (Common.getToken()) {
            headers.append('Authorization', 'Bearer ' + Common.getToken());
        }

        return request({
            url: API_BASE_URL + '/posts/post/' + postId + '/load-photo',
            headers: headers,
            method: 'POST',
            body: formData
        });
    };
}

export default new PostAPI();
