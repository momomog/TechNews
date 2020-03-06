import AuthAPI from "../api/AuthAPI";

export const usernameAvailabilityValidate = (value) => {
    debugger
    return AuthAPI.checkUsernameAvailability(value.userName)
        .then(response => {
            debugger
            if (response.available)
                return 'username is taken'
        })
}