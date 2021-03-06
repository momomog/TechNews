import React from 'react'
import {match, NavLink, useRouteMatch} from 'react-router-dom'
import Common from '../../common/Common'

const NotFoundComponent: React.FC = () => {
    const {params}: match<{ code: string }> = useRouteMatch()

    const code = params.code === 'undefined' ? 404 : params.code
    const message = params.code !== 'undefined' ? Common.getErrorMessage(+code) : Common.getErrorMessage(404)
    // const code = params.code
    // const message = Common.getErrorMessage(+code)

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">

                        <h1 style={{fontSize: '5em', marginBottom: '7px'}}>{code}</h1>
                        <h3 className="mb-4">{message}</h3>

                        <div className="error-details">
                            <p>Проверьте правильность введенных данных и повторите попытку</p>
                        </div>

                        <div className="error-actions">
                            <NavLink to="/" className="btn btn-default btn-lg">
                                <span className="glyphicon glyphicon-home"/>
                                &nbsp;На главную
                            </NavLink>
                            <a href="mailto:momomogggq@gmail.com" className="btn btn-default active btn-lg">
                                <span className="glyphicon glyphicon-envelope"/>
                                &nbsp;Написать нам
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundComponent