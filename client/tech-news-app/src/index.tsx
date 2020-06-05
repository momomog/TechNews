import React from 'react'
import ReactDOM from 'react-dom'
import AppWrapper from './components/AppWrapper'
import {Provider} from 'react-redux'

import store from './redux/reduxStore'

import * as serviceWorker from './serviceWorker'
import './styles/index.css'
import './styles/posts.css'
import './styles/header.scss'
import './styles/themes.scss'
import './styles/footer.css'
import './styles/profile.css'
import './styles/libraries-overload.css'
import 'react-notifications/lib/notifications.css'
import 'font-awesome/css/font-awesome.min.css'
import './static/libraries/google-Roboto.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import './web.config'

ReactDOM.render(
    <Provider store={store}>
        <AppWrapper/>
    </Provider>, document.getElementById('root'))


serviceWorker.unregister()
