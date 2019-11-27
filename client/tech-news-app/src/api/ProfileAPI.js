import * as axios from "axios";
import Common from "../common/Common";


const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        Authorization: Common.getToken() ? 'Bearer ' + Common.getToken() : ''
    }
});

class ProfileAPI {
    onLoadPhoto(photoBody) {
        const formData = new FormData();
        formData.append('photo', photoBody);

        return instance.post('api/user/me/load_photo', formData)
            .then(response => response.data)
    };

}

export default new ProfileAPI();