import jwt_decode from "jwt-decode";

class AuthService {

    isAuth() {
        let isAuth = false;

        if (this.getToken()) {
            const user = this.decodeJWTToken()
            if (user && user.sub && user.exp > parseInt(new Date() / 1000))
                isAuth = true
            else
                this.removeToken()
        }

        return isAuth
    }

    getUserId() {
        if (this.getToken())
            return this.decodeJWTToken().sub
    }

    // Сет токена авторизации
    setToken(token, remember) {
        if (remember)
            localStorage.setItem('accessToken', token)
        else
            sessionStorage.setItem('accessToken', token)
    }

    // Гет токена авторизации
    getToken() {
        if (sessionStorage.getItem('accessToken'))
            return sessionStorage.getItem('accessToken')
        return localStorage.getItem('accessToken');
    }

    // Удаление токена авторизации
    removeToken() {
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('accessToken');
    }


    // проверка является ли пользователь администратором
    isAdmin() {
        let user = this.decodeJWTToken(),
            isAdmin = false;

        if (user && user.roles) {
            user.roles.forEach(role => {
                if (role.authority === 'ROLE_ADMIN')
                    isAdmin = true;
            });
        }

        return isAdmin;
    }

    // Раскодирование JWT-токена
    decodeJWTToken() {
        if (this.getToken())
            return jwt_decode(this.getToken());
    }
}

export default new AuthService()