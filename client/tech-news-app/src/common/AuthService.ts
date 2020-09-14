import jwt_decode from 'jwt-decode'

interface JwtUserData {
    sub: string
    roles: Array<{ authority: string }>
    iat: number
    exp: number
}

/**
 * Сервис авторизации
 */
class AuthService {
    /**
     * Проверка на авторизованность пользователя
     */
    isAuth = (): boolean => {
        let isAuth = false

        if (this.getToken()) {
            const user: JwtUserData = this.decodeJWTToken()

            if (user && user.sub && user.exp > parseInt((new Date().getTime() / 1000).toString()))
                isAuth = true
            else
                this.removeToken()
        }
        return isAuth
    }

    /**
     * Сет токена авторизации
     */
    setToken = (token: string, remember?: boolean) => {
        if (remember)
            localStorage.setItem('accessToken', token)
        else
            sessionStorage.setItem('accessToken', token)
    }

    /**
     * Получение токена авторизации
     */
    getToken = (): string | null => {
        if (sessionStorage.getItem('accessToken'))
            return sessionStorage.getItem('accessToken')
        return localStorage.getItem('accessToken')
    }

    /**
     * Удаление токена авторизации
     */
    removeToken = () => {
        sessionStorage.removeItem('accessToken')
        localStorage.removeItem('accessToken')
    }

    /**
     * Проверка является ли пользователь администратором
     */
    isAdmin = (): boolean => {
        const user: JwtUserData = this.decodeJWTToken()
        let isAdmin = false

        if (user && user.roles) {
            user.roles.forEach(role => {
                if (role.authority === 'ROLE_ADMIN')
                    return isAdmin = true
            })
        }
        return isAdmin
    }

    /**
     * Раскодирование JWT-токена
     */
    private decodeJWTToken = () => {
        if (this.getToken())
            return jwt_decode(this.getToken())
    }
}

export default new AuthService()