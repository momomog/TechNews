package ru.technews.common;

public class Common {
    public static String getErrorMessage(int errorCode) {
        switch (errorCode) {
            case 401:
                return "Для доступа к запрашиваемому ресурсу требуется аутентификация";
            case 404:
                return "Запрашиваемая страница не найдена";
            case 500:
            default:
                return "Произошла внутренняя ошибка сервера. Попробуйте повторить запрос позже";
        }
    }
}
