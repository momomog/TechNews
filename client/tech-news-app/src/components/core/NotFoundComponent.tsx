import React from "react";
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import Common from "../../common/Common";

const NotFoundComponent: React.FC<RouteComponentProps<any>> = ({match}) => {

    // const code = match.params.code || 404
    // const message = Common.getErrorMessage(+code) || Common.getErrorMessage(404)
    const code = match.params.code
    const message = Common.getErrorMessage(+code)

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">

                        <h1>{code}</h1>
                        <h3 className="mb-4">{message}</h3>

                        <div className="error-details">
                            <p>Проверьте правильность введенных данных и повторите попытку</p>
                        </div>

                        <div className="error-actions">
                            <NavLink to="/" className="btn btn-default btn-lg">
                                <span className="glyphicon glyphicon-home"/>
                                &nbsp;На главную
                            </NavLink>
                            <a href="mailto:momomogggq@gmail.com" className="btn btn-default btn-lg">
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

export const NotFoundComponentWrapper = compose(withRouter)(NotFoundComponent)