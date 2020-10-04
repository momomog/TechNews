import React from 'react'

type State = {
    isError: boolean
    errorMessage: string
    errorStack: string
}

/**
 * Компонент обработки ошибки
 */
export default class ErrorBoundary extends React.Component<{}, State> {
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            errorMessage: '',
            errorStack: ''
        }
    }

    static getDerivedStateFromError(error) {
        return {
            isError: true,
            errorMessage: error.message,
            errorStack: error.stack
        }
    }

    render() {
        return this.state.isError
            ? (
                <div className="container" style={{minHeight: '47vh', marginTop: '10%'}}>
                    <h1 className="text-center">{this.state.errorMessage}</h1>
                    <h2 className="text-center" style={{marginBottom: '15px'}}>
                        В процессе работы страницы возникла неожиданная ошибка.
                    </h2>
                    <button className="btn btn-primary m-auto d-flex"
                            onClick={() => window.location.href = '/'}>
                        Вернуться на главную страницу
                    </button>
                </div>
            )
            : this.props.children
    }
}
