import {request} from "./BaseRequest";
import AuthService from "../common/AuthService";
import {ProfileRequest} from "../models/RequestsModel";
import {User} from "../models/UserModel";

class ProfileAPI {
    getCurrentUser = (): Promise<User> => {
        if (!AuthService.getToken())
            return Promise.reject({
                    code: 401,
                    message: 'Требуется наличие авторизации'
                }
            )

        return request({
            url: `user/me`
        })
    }

    getUserProfile = (username: string): Promise<User> => request({
        url: `users/${username}`
    })

    onLoadPhoto = (photoBody: File): Promise<boolean> => {
        const formData = new FormData()
        formData.append('photo', photoBody)

        return request({
            url: `user/me/load-photo`,
            headers: new Headers({}),
            method: 'POST',
            body: formData
        })
    }

    onUpdateUserData = (userDataRequest: ProfileRequest): Promise<boolean> => request({
        url: `user/me/update`,
        method: 'POST',
        body: JSON.stringify(userDataRequest)
    })
}

export default new ProfileAPI()