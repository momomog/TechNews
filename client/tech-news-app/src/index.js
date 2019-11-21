import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from "react-redux";
import store from "./redux/ReduxStore";

import * as serviceWorker from './serviceWorker';

import './styles/Index.css';
import './styles/Posts.css';
import './styles/Header.css';
import './styles/Footer.css';
import 'react-notifications/lib/notifications.css';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
