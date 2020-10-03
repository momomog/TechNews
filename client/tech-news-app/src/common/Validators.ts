import AuthAPI from '../api/AuthAPI'
import Common from './Common'

// Корректность введенного почтового адреса
export const email = (value: string): string | undefined =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Введите корректный почтовый адрес'
        : undefined

// Корректность введенного юзернейма
export const latinDigital = (value: string): string | undefined =>
    value && !/^[A-Za-z0-9!$%^&*-=]+$/.test(value)
        ? 'Допустимы только символы латинского алфавита, числа и спецсимволы !$%^&*-_='
        : undefined

// Необходимость заполнения поля
export const required = (value: string): string | undefined =>
    value && value.toString().trim() ? undefined : 'Необходимо заполнить это поле'

// Необходимость загрузки файла
export const requiredFile = (value: File): string | undefined =>
    (value && value.name) || (value && value[0] && value[0].name) ? undefined : 'Необходимо загрузить изображение'

// Проверка на одинаковые пароли
export const isSamePasswords = (value: string, values: {password: string}): string | undefined =>
    values.password && values.password.trim() === value.trim() ? undefined : 'Введенные пароли не совпадают'

// Минимальная длина поля
const minLength = (min: number) => (value: string): string | undefined =>
    value && value.length < min ? `Минимальная длина этого поля: ${min} ${Common.getSymbolsCountText(min)}` : undefined
export const minLength3 = minLength(3)
export const minLength6 = minLength(6)
export const minLength50 = minLength(50)
export const minLength200 = minLength(200)
export const minLength1000 = minLength(1000)

// Максимальная длина поля
const maxLength = (max: number) => (value: string): string | undefined =>
    value && value.length > max ? `Максимальная длина этого поля: ${max} ${Common.getSymbolsCountText(max)}` : undefined
export const maxLength15 = maxLength(15)
export const maxLength30 = maxLength(30)
export const maxLength40 = maxLength(40)
export const maxLength200 = maxLength(200)
export const maxLength1000 = maxLength(1000)
export const maxLength20000 = maxLength(20000)

type AsyncError = {
    username?: string
    email?: string
}

// Проверка на занятость почтового адреса или юзернейма
export const usernameEmailValidate = async (values, dispatch, props, field): Promise<AsyncError | undefined> => {
    const asyncErrors = {...props.asyncErrors}

    if (field === 'username') {
        return AuthAPI.checkUsernameAvailability(values.username)
            .then(response => {
                if (!response.available)
                    throw {
                        ...asyncErrors,
                        username: 'Пользователь с данным никнеймом уже зарегистрирован!'
                    }
                else
                    throw asyncErrors
            })
    }

    if (field === 'email') {
        return AuthAPI.checkEmailAvailability(values.email)
            .then(response => {
                if (!response.available)
                    throw {
                        ...asyncErrors,
                        email: 'Данный почтовый адрес уже зарегистрирован!'
                    }
                else
                    throw asyncErrors
            })
    }
}
