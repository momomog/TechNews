import Common from "../common/Common";

export const API_BASE_URL = 'http://localhost:8080/api';

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (Common.getToken()) {
        headers.append('Authorization', 'Bearer ' + Common.getToken())
    }

    const defaults = {
        headers: headers
    };

    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};