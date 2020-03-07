import React from "react";
import {NotificationManager} from "react-notifications";

class Common {

    // Парсинг даты в вид ДД.ММ.ГГГГ
    dateParser(date) {
        if (date)
            return Common.pad(date[2]) + '.' + Common.pad(date[1]) + '.' + date[0];
    }

    // Парсинг даты в вид ДД.ММ.ГГГГ ЧЧ:ММ
    dateTimeParser(date) {
        if (date)
            return Common.pad(date[2]) + '.' + Common.pad(date[1]) + '.' + date[0] + ' ' + Common.pad(date[3]) + ':' + Common.pad(date[4]);
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

            if (age.toString().endsWith('1') && age !== 11) return age + ' год';
            else if (['2', '3', '4'].indexOf(age.toString()) !== -1) return age + ' года';
            return age + ' лет';
        }
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

    // Смена локации
    changeLocation(path = 'posts/all', timeout = 400) {
        setTimeout(function () {
            window.location = path;
        }, timeout);
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

    // Проверка заполненности полей при создании, редактировании поста
    onValidBeforePostSave(fieldBody, fieldName, minValue, maxValue) {
        let errorText = !fieldBody
            ? 'Поле не может быть пустым'
            : fieldBody.length < minValue
                ? `Минимальное количество символов (${minValue})`
                : fieldBody.length > maxValue
                    ? `Превышено максимальное количество символов (${maxValue})`
                    : null;
        if (!errorText)
            return true;

        NotificationManager.error(errorText, fieldName);
        return false;
    }

    // *
    // * private methods
    // *
    // Прибавление 0 к дате, если число даты меньше 10
    static pad(number) {
        return (number < 10 ? '0' : '') + number;
    }
}

export default new Common();
