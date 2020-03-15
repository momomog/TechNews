import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import React from "react";

const RedirectComponent = (props) => {
    return <Redirect to={props.location.redirectPage}/>
}

export const RedirectComponentWrapper = compose(withRouter)(RedirectComponent)