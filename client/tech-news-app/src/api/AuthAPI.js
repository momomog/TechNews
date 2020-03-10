import {API_BASE_URL, request} from "./BaseRequest";

class AuthAPI {
    login(loginRequest) {
        return request({
            url: API_BASE_URL + "/auth/signin",
            method: 'POST',
            body: JSON.stringify(loginRequest)
        })
    }

    signup(signupRequest) {
        return request({
            url: API_BASE_URL + "/auth/signup",
            method: 'POST',
            body: JSON.stringify(signupRequest)
        })
    }

    checkUsernameAvailability(username) {
        return request({
            url: API_BASE_URL + "/auth/user/checkUsernameAvailability?username=" + username,
            method: 'GET'
        })
    }

    checkEmailAvailability(email) {
        return request({
            url: API_BASE_URL + "/auth/user/checkEmailAvailability?email=" + email,
            method: 'GET'
        })
    }
}

export default new AuthAPI();

