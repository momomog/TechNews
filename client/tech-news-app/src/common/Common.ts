class Common {
    // Возраст
    getUserAge = (date: string): string => {
        const birthDate: Date = new Date(date.replace(/\./g, ':')),
            difference = new Date().getTime() - birthDate.getTime(),
            age = Math.floor((difference / (1000 * 60 * 60 * 24) / 365)),
            ageStr = age.toString()

        if (ageStr.endsWith('1') && !ageStr.endsWith('11'))
            return `${age} год`
        else if (['2', '3', '4'].includes(ageStr[ageStr.length - 1]))
            return `${age} года`
        else
            return `${age} лет`
    }

    // Окончание количества комментариев в зависимости от значения
    getCommentaryCountText = (count: number): string => {
        const num = count.toString()

        if (num.endsWith('1') && !num.endsWith('11'))
            return 'комментарий'
        else if (['2', '3', '4'].includes(num[num.length - 1]))
            return 'комментария'
        else
            return 'комментариев'
    }

    // Количество записей поиска в зависимости от значения
    getFindPostsResultText = (count: number): string => {
        const num = count.toString()

        if (num.endsWith('1') && !num.endsWith('11'))
            return `найдена ${count} запись`
        else if (['2', '3', '4'].includes(num[num.length - 1]))
            return `найдены ${count} записи`
        else
            return `найдено ${count} записей`
    }

    // Окончание количества символов в зависимости от значения
    getSymbolsCountText = (count: number): string => {
        const num = count.toString()

        if (num.endsWith('1') && !num.endsWith('11'))
            return 'символ'
        else if (['2', '3', '4'].includes(num[num.length - 1]))
            return 'символа'
        else
            return 'символов'
    }

    // Текст ошибки в зависимости от ответа сервера
    getErrorMessage = (code: number): string => {
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
}

export default new Common()
