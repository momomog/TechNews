import {request} from './BaseRequest'
import {SignInRequest, SignUpRequest} from '../models/RequestsModel'
import {SignInResponse, SignUpResponse} from '../models/ResponseModel'

class AuthAPI {
    /**
     * Авторизация
     */
    login = (loginRequest: SignInRequest): Promise<SignInResponse> => request({
        url: `auth/signin`,
        method: 'POST',
        body: JSON.stringify(loginRequest)
    })

    /**
     * Регистрация
     */
    signup = (signupRequest: SignUpRequest): Promise<SignUpResponse> => request({
        url: `auth/signup`,
        method: 'POST',
        body: JSON.stringify(signupRequest)
    })

    /**
     * Проверка доступности юзернейма
     */
    checkUsernameAvailability = (username: string): Promise<{ available: boolean }> => request({
        url: `auth/user/checkUsernameAvailability?username=${username}`
    })

    /**
     * Проверка доступности емайла
     */
    checkEmailAvailability = (email: string): Promise<{ available: boolean }> => request({
        url: `auth/user/checkEmailAvailability?email=${email}`
    })
}

export default new AuthAPI()

