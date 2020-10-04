import React from 'react'
import {Router} from 'react-router-dom'
import history from '../history'
import Footer from './Footer/Footer'
import HeaderWrapper from './Header/HeaderWrapper'
import SwitchRouter from './pages/SwitchRouter'
import ErrorBoundary from './core/ErrorBoundary'

/**
 * Корневой компонент
 */
const App: React.FC = (): React.ReactElement => {
    return (
        <Router history={history}>
            <HeaderWrapper/>
            <ErrorBoundary>
                <SwitchRouter/>
            </ErrorBoundary>
            <Footer/>
        </Router>
    )
}

export default App
