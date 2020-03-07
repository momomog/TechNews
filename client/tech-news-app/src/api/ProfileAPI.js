import Common from "../common/Common";
import {API_BASE_URL, request} from "./BaseRequest";
import AuthService from "../common/AuthService";


class ProfileAPI {
    getCurrentUser() {
        if (!AuthService.getToken()) {
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

        if (AuthService.getToken()) {
            headers.append('Authorization', 'Bearer ' + AuthService.getToken());
        }

        return request({
            url: API_BASE_URL + '/user/me/load-photo',
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