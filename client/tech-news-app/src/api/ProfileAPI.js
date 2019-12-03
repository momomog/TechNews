import Common from "../common/Common";
import {API_BASE_URL, request} from "./BaseRequest";


class ProfileAPI {

    getCurrentUser() {
        if (!Common.getToken()) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: API_BASE_URL + "/user/me",
            method: 'GET',
        });
    }

    getUserProfile(username) {
        return request({
            url: API_BASE_URL + "/users/" + username,
            method: 'GET'
        });
    }

    onLoadPhoto(photoBody) {
        const formData = new FormData();
        formData.append('photo', photoBody);
        const headers = new Headers({});

        if (Common.getToken()) {
            headers.append('Authorization', 'Bearer ' + Common.getToken());
        }

        return request({
            url: API_BASE_URL + '/user/me/load_photo',
            headers: headers,
            method: 'POST',
            body: formData
        });
    };

    onUpdateUserData(userDataRequest) {
        return request({
            url: API_BASE_URL + '/user/me/update',
            method: 'POST',
            body: JSON.stringify(userDataRequest)
        });
    };
}

export default new ProfileAPI();