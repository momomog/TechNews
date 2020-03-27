import {API_BASE_URL, request} from "./BaseRequest";
import {SignInRequest, SignUpRequest} from "../models/RequestsModel";
import {SignInResponse, SignUpResponse} from "../models/ResponseModel";

class AuthAPI {
    login(loginRequest: SignInRequest): Promise<SignInResponse> {
        return request({
            url: `${API_BASE_URL}/auth/signin`,
            method: 'POST',
            body: JSON.stringify(loginRequest)
        })
    }

    signup(signupRequest: SignUpRequest): Promise<SignUpResponse> {
        return request({
            url: `${API_BASE_URL}/auth/signup`,
            method: 'POST',
            body: JSON.stringify(signupRequest)
        })
    }

    checkUsernameAvailability(username: string): Promise<{available:boolean}> {
        return request({
            url: `${API_BASE_URL}/auth/user/checkUsernameAvailability?username=${username}`,
            method: 'GET'
        })
    }

    checkEmailAvailability(email: string): Promise<{available:boolean}> {
        return request({
            url: `${API_BASE_URL}/auth/user/checkEmailAvailability?email=${email}`,
            method: 'GET'
        })
    }
}

export default new AuthAPI()

