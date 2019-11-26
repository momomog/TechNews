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
        return instance.post('profile/me/load_photo',{
            photo: photoBody,
        }).then(response => response.data)
    };

    getPostData(sectionId, postId) {
        return instance.get('posts/' + getSectionName(sectionId) + '/post/' + postId)
            .then(response => response.data)
    };
}

export default new ProfileAPI();