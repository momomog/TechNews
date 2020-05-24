import React from 'react'
import {Router} from 'react-router-dom'
import history from '../history'
import Footer from './Footer/Footer'
import HeaderWrapper from './Header/HeaderWrapper'
import SwitchRouter from './pages/SwitchRouter'

/**
 * Корневой компонент
 */
const App = () =>
    (
        <Router history={history}>
            <HeaderWrapper/>
            <SwitchRouter/>
            <Footer/>
        </Router>
    )

export default App
