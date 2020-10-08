import AuthService from '../common/AuthService'

type Options = {
    url: string
    method?: string
    body?: string | FormData
    headers?: Headers
}

export const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'http://87.76.1.16:9001/api'
    : 'http://localhost:8081/api'

export const WS_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'ws://87.76.1.16:9001/api'
    : 'ws://localhost:8081/api'

/**
 * Базовый запрос приложения
 */
/* eslint-disable */
export const request = (opts: Options): Promise<any> => {
    const controller: AbortController = new AbortController()

    const headers = opts.headers
        ? opts.headers
        : new Headers({
            /* eslint-disable */
            'Content-Type': 'application/json'
        })

    if (AuthService.getToken())
        headers.append('Authorization', `Bearer ${AuthService.getToken()}`)

    const defaults: RequestInit = {
        headers,
        method: 'GET',
        signal: controller.signal
    }

    const options: Options = Object.assign({}, defaults, opts)
    const url = `${API_BASE_URL}/${options.url}`

    setTimeout(() => controller.abort(), 10000)

    return fetch(url, options)
        .then(response =>
            response.json()
                .then(json => response.ok
                    ? json
                    : Promise.reject(json))
        )
}
