import {getSectionName} from "../common/Const";
import {API_BASE_URL, request} from "./BaseRequest";

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
}

export default new PostAPI();
