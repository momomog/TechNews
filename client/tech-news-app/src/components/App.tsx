import React from 'react'
import {Router} from 'react-router-dom'
import history from '../history'
import Footer from './Footer/Footer'
import SwitchRouter from './pages/SwitchRouter'
import ErrorBoundary from './core/ErrorBoundary'
import Header from './Header/Header'

/**
 * Корневой компонент
 */
const App: React.FC = (): React.ReactElement => {
    return (
        <Router history={history}>
            <Header/>
            <ErrorBoundary>
                <SwitchRouter/>
            </ErrorBoundary>
            <Footer/>
        </Router>
    )
}

export default App
