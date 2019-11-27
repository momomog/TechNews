import Common from "../common/Common";

const API_BASE_URL = 'http://localhost:8080/api';
const ACCESS_TOKEN = 'accessToken';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (Common.getToken()) {
        headers.append('Authorization', 'Bearer ' + Common.getToken())
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

class AuthAPI {
    login(loginRequest) {
        return request({
            url: API_BASE_URL + "/auth/signin",
            method: 'POST',
            body: JSON.stringify(loginRequest)
        });
    }

    signup(signupRequest) {
        return request({
            url: API_BASE_URL + "/auth/signup",
            method: 'POST',
            body: JSON.stringify(signupRequest)
        });
    }

    checkUsernameAvailability(username) {
        return request({
            url: API_BASE_URL + "/auth/user/checkUsernameAvailability?username=" + username,
            method: 'GET'
        });
    }

    checkEmailAvailability(email) {
        return request({
            url: API_BASE_URL + "/auth/user/checkEmailAvailability?email=" + email,
            method: 'GET'
        });
    }


    getCurrentUser() {
        if (!Common.getToken()) {
            return Promise.reject("No access token set.");
        }

        return request({
            url: API_BASE_URL + "/user/me",
            method: 'GET'
        });
    }

    getUserProfile(username) {
        return request({
            url: API_BASE_URL + "/users/" + username,
            method: 'GET'
        });
    }

}

export default new AuthAPI();

