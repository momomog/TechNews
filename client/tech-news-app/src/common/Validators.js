import AuthAPI from "../api/AuthAPI";


// Validators
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Введите корректный почтовый адрес'
        : undefined

export const required = value => (value && value.trim() ? undefined : 'Необходимо заполнить это поле')

export const isSamePasswords = (value, values) => {
    return values.password && values.password.trim() === values.repeatPassword.trim() ? undefined : 'Введенные пароли не совпадают'
}


const minLength = min => value =>
    value && value.length < min ? `Минимальная длина этого поля: ${min} символов` : undefined
export const minLength3 = minLength(3)
export const minLength6 = minLength(6)


export const usernameEmailValidate = async (values, dispatch, props, field) => {
    let asyncErrors = {
        ...props.asyncErrors
    }

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
