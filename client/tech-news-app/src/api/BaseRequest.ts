import AuthService from '../common/AuthService'

type Options = {
    url: string
    method?: string
    body?: string | FormData
    headers?: Headers
}

export const API_BASE_URL: string = process.env.NODE_ENV === 'production'
    ? 'http://87.76.1.16:9001/api'
    : 'http://localhost:8081/api'

export const WS_BASE_URL: string = process.env.NODE_ENV === 'production'
    ? 'ws://87.76.1.16:9001/api'
    : 'ws://localhost:8081/api'

/**
 * Базовый запрос приложения
 */
export const request = (opts: Options): Promise<any> => {
    const headers = opts.headers
        ? opts.headers
        : new Headers({
            /* eslint-disable */
            'Content-Type': 'application/json'
        })

    if (AuthService.getToken())
        headers.append('Authorization', `Bearer ${AuthService.getToken()}`)

    const defaults = {
        headers,
        method: 'GET'
    }

    const options: Options = Object.assign({}, defaults, opts)
    const url = `${API_BASE_URL}/${options.url}`

    return fetch(url, options)
        .then(response =>
            response.json()
                .then(json => response.ok
                    ? json
                    : Promise.reject(json))
        )
}
