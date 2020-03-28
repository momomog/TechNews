import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from "./components/AppWrapper";
import {Provider} from "react-redux";

import store from "./redux/ReduxStore";

import * as serviceWorker from './serviceWorker';
import './styles/index.css';
import './styles/posts.css';
import './styles/header.css';
import './styles/footer.css';
import './styles/profile.css';
import './styles/libraries-overload.css';
import 'react-notifications/lib/notifications.css';

// import './static/libraries/bootstrap.min.4.1.1.css'
// import './static/libraries/bootstrap.min.3.3.5.css'
// import './static/libraries/bootstrap-combined.min.css'
// import './static/libraries/font-awesome.min.css'
// import './static/libraries/google-Roboto.css'

ReactDOM.render(
    <Provider store={store}>
        <AppWrapper/>
    </Provider>, document.getElementById('root'))


serviceWorker.unregister()
