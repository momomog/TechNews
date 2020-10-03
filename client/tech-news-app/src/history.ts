import {createBrowserHistory, History} from 'history'

const history: History = createBrowserHistory()

// if (!jest) {
    history.listen(() => {
        window.scrollTo(0, 0)
    })
// }

/**
 * Глобальный объект history приложения
 */
export default history
