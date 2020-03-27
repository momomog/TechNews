import {API_BASE_URL, request} from "./BaseRequest";
import AuthService from "../common/AuthService";
import {ProfileRequest} from "../models/RequestsModel";
import {User} from "../models/UserModel";


class ProfileAPI {
    getCurrentUser(): Promise<User> {
        if (!AuthService.getToken()) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: `${API_BASE_URL}/user/me`,
            method: 'GET',
        })
    }

    getUserProfile(username: string): Promise<User> {
        return request({
            url: `${API_BASE_URL}/users/${username}`,
            method: 'GET'
        })
    }

    onLoadPhoto(photoBody: File): Promise<boolean> {
        const formData = new FormData();
        formData.append('photo', photoBody);
        const headers = new Headers({});

        if (AuthService.getToken())
            headers.append('Authorization', 'Bearer ' + AuthService.getToken())

        return request({
            url: `${API_BASE_URL}/user/me/load-photo`,
            headers: headers,
            method: 'POST',
            body: formData
        })
    }

    onUpdateUserData(userDataRequest: ProfileRequest): Promise<boolean> {
        return request({
            url: `${API_BASE_URL}/user/me/update`,
            method: 'POST',
            body: JSON.stringify(userDataRequest)
        })
    }
}

export default new ProfileAPI()