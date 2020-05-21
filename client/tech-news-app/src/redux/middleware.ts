import {applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose

const loggerMiddleware = store => next => action => {
    console.log('State', store.getState())
    console.log('Action', action)
    return next(action)
}

export default composeEnhancers(applyMiddleware(loggerMiddleware, thunkMiddleware))