import AuthAPI from "../api/AuthAPI";

const minLength = min => value =>
    value && value.length < min ? `Минимальная длина этого поля: ${min} символов` : undefined

// Validators
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Введите корректный почтовый адрес'
        : undefined

export const required = value => (value && value.trim() ? undefined : 'Необходимо заполнить это поле')

export const minLength3 = minLength(3)
export const minLength6 = minLength(6)

export const usernameAvailabilityValidate = (userName) => {
    debugger
    AuthAPI.checkUsernameAvailability(userName)
        .then(response => {
            debugger
            if (response.available)
                return undefined
            else return 'username is taken'
        })
}