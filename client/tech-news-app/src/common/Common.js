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
}

export default new Common();
