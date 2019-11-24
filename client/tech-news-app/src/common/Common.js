import React from "react";
import jwt_decode from "jwt-decode";

class Common {

    // Парсинг даты в вид ДД.ММ.ГГГГ
    dateParser(date) {
        if (date)
            return date[2] + '.' + this.pad(date[1]) + '.' + this.pad(date[0]);
    }

    // Парсинг даты в вид ДД.ММ.ГГГГ ЧЧ:ММ
    dateTimeParser(date) {
        if (date)
            return date[2] + '.' + this.pad(date[1]) + '.' + this.pad(date[0]) + ' ' + this.pad(date[3]) + ':' + this.pad(date[4]);
    }

    // Прибавление 0, если число даты меньше 10
    pad(number) {
        return (number < 10 ? '0' : '') + number
    }

    // Окончание количества комментариев в зависимости от значения
    getCommentaryCountText(number) {
        if (number === 1) return 'комментарий';
        else if ([2, 3, 4].indexOf(number) !== -1) return 'комментария';
        return 'комментариев';
    }

    // Раскодирование JWT-токена
    decodeJWTToken(token) {
        if (token)
            return jwt_decode(token);
        if (localStorage.getItem('accessToken'))
            return jwt_decode(localStorage.getItem('accessToken'));
    }

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
