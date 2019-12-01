import React from "react";
import jwt_decode from "jwt-decode";

class Common {

    // Парсинг даты в вид ДД.ММ.ГГГГ
    dateParser(date) {
        if (date)
            return this.pad(date[2]) + '.' + this.pad(date[1]) + '.' + date[0];
    }

    // Парсинг даты в вид ДД.ММ.ГГГГ ЧЧ:ММ
    dateTimeParser(date) {
        if (date)
            return this.pad(date[2]) + '.' + this.pad(date[1]) + '.' + date[0] + ' ' + this.pad(date[3]) + ':' + this.pad(date[4]);
    }

    // Парсинг массива даты в объект Date
    intArrayToDate(date) {
        if (date)
            return new Date(date[0], date[1] - 1, date[2]);
    }

    // Возраст
    getUserAge(date) {
        if (date) {
            let birthDate = new Date('' + date[1] + ',' + date[2] + ',' + date[0]);
            let difference = new Date() - birthDate;
            let age = Math.floor((difference / (1000 * 60 * 60 * 24) / 365));

            if (age.toString().endsWith('1')) return age + ' год';
            else if (['2', '3', '4'].indexOf(age.toString()) !== -1) return age + ' года';
            return age + ' лет';
        }
    }

    // Прибавление 0, если число даты меньше 10
    pad(number) {
        return (number < 10 ? '0' : '') + number;
    }

    // Окончание количества комментариев в зависимости от значения
    getCommentaryCountText(number) {
        if (number) {
            let num = number.toString();
            if (num.endsWith('1') && number !== 11) return 'комментарий';
            else if (['2', '3', '4'].indexOf(num[num.length - 1]) !== -1
                || (['2', '3', '4'].indexOf(num[0]) !== -1)) return 'комментария';
        }
        return 'комментариев';
    }

    // Сет токена авторизации
    setToken(token) {
        localStorage.setItem('accessToken', token);
    }

    // Гет токена авторизации
    getToken() {
        return localStorage.getItem('accessToken');
    }

    // Удаление токена авторизации
    removeToken() {
        localStorage.removeItem('accessToken');
    }

    // Раскодирование JWT-токена
    decodeJWTToken() {
        if (this.getToken())
            return jwt_decode(this.getToken());
    }

    // проверка является ли пользователь администратором
    isUserAdmin = () => {
        let user = this.decodeJWTToken();
        let isAdmin = false;

        if (user && user.roles) {
            user.roles.forEach(role => {
                // if (role.authority === 'ROLE_ADMIN')
                if (role.authority === 'ROLE_USER')
                    isAdmin = true;
            });
        }

        return isAdmin;
    };

    // Текст ошибки в зависимости от ответа сервера
    showErrorText(code) {
        switch (code) {
            case 401:
                return 'Проверьте правильность введенных данных';
            case 500:
                return 'Произошла внутренняя ошибка сервера. Попробуйте повторить запрос позже';
            default:
                return 'Неизвестная ошибка';
        }
    }
}

export default new Common();
