import {applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import {SagaMiddleware} from '@redux-saga/core'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose
export const sagaMiddleware: SagaMiddleware = createSagaMiddleware()

function getMiddleware() {
    const middleware = [
        thunkMiddleware,
        sagaMiddleware
    ]

    // if (process.env.NODE_ENV === 'development')
    //     middleware.push(logger)

    return applyMiddleware(...middleware)
}

export default composeEnhancers(
    getMiddleware()
)
