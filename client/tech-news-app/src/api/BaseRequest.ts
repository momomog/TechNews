import AuthService from '../common/AuthService'

export const API_BASE_URL = 'http://localhost:8081/api'
// export const API_BASE_URL = 'http://87.76.1.16:9001/api'

/**
 * Базовый запрос приложения
 */
export const request = (options): Promise<any> => {
    const headers = options.headers
        ? options.headers
        : new Headers({
            'Content-Type': 'application/json'
        })

    if (AuthService.getToken())
        headers.append('Authorization', `Bearer ${AuthService.getToken()}`)

    const defaults = {
        headers,
        method: 'GET'
    }

    options = Object.assign({}, defaults, options)
    const url = `${API_BASE_URL}/${options.url}`

    return fetch(url, options)
        .then(response =>
            response.json()
                .then(json => response.ok
                    ? json
                    : Promise.reject(json))
        )
}