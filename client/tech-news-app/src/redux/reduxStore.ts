import {createStore, Store} from 'redux'
import composeEnhancers, {sagaMiddleware} from './middleware'
import rootReducer from './reducers/rootReducer'
import rootSaga from './rootSaga'

const store: Store = createStore(rootReducer, composeEnhancers)
sagaMiddleware.run(rootSaga)

export default store