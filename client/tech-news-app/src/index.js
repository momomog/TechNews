import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state from './redux/postsReducer'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App store={state}/>,
    document.getElementById('root'));


serviceWorker.unregister();
