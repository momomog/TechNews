import * as axios from "axios";
import {getSectionName} from "../common/Const";

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        Authorization: localStorage.getItem('accessToken') ? 'Bearer ' + localStorage.getItem('accessToken') : ''
    }
});

class ProfileAPI {
    onLoadPhoto(photoBody) {
        const formData = new FormData();
        formData.append('photo', photoBody);

        return instance.post('api/user/me/load_photo', formData)
            .then(response => response.data)
    };

    getPostData(sectionId, postId) {
        return instance.get('posts/' + getSectionName(sectionId) + '/post/' + postId)
            .then(response => response.data)
    };
}

export default new ProfileAPI();