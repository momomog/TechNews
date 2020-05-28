import {createStore, Store} from 'redux'
import composeEnhancers, {sagaMiddleware} from './middleware'
import rootReducer from './reducers/rootReducer'
import {watchSetComments} from './sagas'

const store: Store = createStore(rootReducer, composeEnhancers)
sagaMiddleware.run(watchSetComments)

export default store