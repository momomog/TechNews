import {createBrowserHistory} from "history";

const history = createBrowserHistory()

if (!jest) {
    history.listen(_ => {
        window.scrollTo(0, 0)
    })
}

/**
 * Глобальный объект history приложения
 */
export default history