import {createStore, Store} from 'redux'
import composeEnhancers from './middleware'
import rootReducer from './reducers/rootReducer'

const store: Store = createStore(rootReducer, composeEnhancers)

export default store