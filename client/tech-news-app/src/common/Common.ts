class Common {

    // Парсинг даты в вид ДД.ММ.ГГГГ
    dateParser(date: Array<number>): string | undefined {
        if (date)
            return Common.pad(date[2]) + '.' + Common.pad(date[1]) + '.' + date[0]
    }

    // Парсинг даты в вид ДД.ММ.ГГГГ ЧЧ:ММ
    dateTimeParser(date: Array<number>): string | undefined {
        if (date)
            return Common.pad(date[2]) + '.' + Common.pad(date[1]) + '.' + date[0] + ' ' + Common.pad(date[3]) + ':' + Common.pad(date[4])
    }

    // Парсинг массива даты в объект Date
    intArrayToDate(date: Array<number> | undefined): Date | undefined {
        if (date)
            return new Date(date[0], date[1] - 1, date[2])
    }

    // Возраст
    getUserAge(date: Array<number>): string | undefined {
        if (date) {
            let birthDate: Date = new Date('' + date[1] + ',' + date[2] + ',' + date[0]);
            let difference = new Date().getTime() - birthDate.getTime();
            let age = Math.floor((difference / (1000 * 60 * 60 * 24) / 365));

            if (age.toString().endsWith('1') && age !== 11)
                return age + ' год';
            else if (['2', '3', '4'].indexOf(age.toString()) !== -1)
                return age + ' года';

            return age + ' лет';
        }
    }

    // Окончание количества комментариев в зависимости от значения
    getCommentaryCountText(count: number): string | undefined {
        if (count) {
            let num = count.toString();
            if (num.endsWith('1') && count !== 11) return 'комментарий';
            else if (['2', '3', '4'].indexOf(num[num.length - 1]) !== -1
                || (['2', '3', '4'].indexOf(num[0]) !== -1)) return 'комментария';
        }
        return 'комментариев';
    }

    // Количество записей поиска в зависимости от значения
    getFindPostsResultText(count: number): string | undefined {
        if (count) {
            let num = count.toString();
            if (num.endsWith('1') && count !== 11) return `найдена ${count} запись`
            else if (['2', '3', '4'].indexOf(num[num.length - 1]) !== -1
                || (['2', '3', '4'].indexOf(num[0]) !== -1)) return `найдены ${count} записи`
        }
        return `найдено ${count} записей`;
    }

    // Окончание количества символов в зависимости от значения
    getSymbolsCountText(count: number): string | undefined {
        if (count) {
            let num = count.toString();
            if (num.endsWith('1') && count !== 11) return 'символ';
            else if (['2', '3', '4'].indexOf(num[num.length - 1]) !== -1
                || (['2', '3', '4'].indexOf(num[0]) !== -1)) return 'символа';
        }
        return 'символов'
    }

    // Текст ошибки в зависимости от ответа сервера
    getErrorMessage(code: number): string {
        switch (code) {
            case 401:
                return 'Для доступа к запрашиваемому ресурсу требуется аутентификация'
            case 404:
                return 'Запрашиваемая страница не найдена'
            case 500:
                return 'Произошла внутренняя ошибка сервера. Попробуйте повторить запрос позже'
            default:
                return 'Неизвестная ошибка'
        }
    }

    // *
    // * private methods
    // *
    // Прибавление 0 к дате, если число даты меньше 10
    static pad(num: number): string | void {
        return (num < 10 ? '0' : '') + num
    }
}

export default new Common()