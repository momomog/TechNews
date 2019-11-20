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
            case 401: return <div>Не удалось войти.<br/>Проверьте правильность введенных данных</div>;
            case 500: return <div>Произошла внутренняя ошибка сервера.<br/>Попробуйте повторить запрос позже</div>;
            default: return <div>Неизвестная ошибка</div>
        }
    }
}

export default new Common();
