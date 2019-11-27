import * as axios from "axios";
import {getSectionName} from "../common/Const";
import Common from "../common/Common";

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        Authorization: Common.getToken()  ? 'Bearer ' + Common.getToken() : ''
    }
});

class PostAPI {
    getAllPosts(sectionId, postPage) {
        return instance.get('posts/' + getSectionName(sectionId) + '/' + postPage)
            .then(response => response.data)
    };

    getPostData(sectionId, postId) {
        return instance.get('posts/' + getSectionName(sectionId) + '/post/' + postId)
            .then(response => response.data)
    };
}

export default new PostAPI();
