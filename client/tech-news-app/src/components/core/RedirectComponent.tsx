import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from 'redux'
import React from 'react'

interface Props {
    location: {
        redirectUrl: string
    }
}


const RedirectComponent: React.FC<Props & RouteComponentProps<any>> = (props) => {
    return <Redirect to={props.location.redirectUrl}/>
}

export const RedirectComponentWrapper = compose(withRouter)(RedirectComponent)