import {Redirect} from 'react-router-dom'
import React from 'react'

interface Props {
    location: {
        redirectUrl: string
    }
}


const RedirectComponent: React.FC<Props> = ({location}: Props) => {
    return <Redirect to={location.redirectUrl}/>
}

export default RedirectComponent

// interface Props {
//     location: {
//         redirectUrl: string
//     }
// }
//
//
// const RedirectComponent: React.FC<Props & RouteComponentProps<any>> = (props) => {
//     return <Redirect to={props.location.redirectUrl}/>
// }
//
// export const RedirectComponentWrapper = compose(withRouter)(RedirectComponent)
