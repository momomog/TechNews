import React from "react";
import {Input} from "../../../../../common/FormControls/Input";
import {Field} from "redux-form";

export function ProfileField(props) {
    return (
        <div className="col-xs-5 mt-4 d-flex justify-content-end">
            {
                props.isSocial &&
                <i id="social-gp" className={`fa fa-${props.name} social mr-2 mt-4 profile-edit-icon`}/>
            }
            <span className="mr-2 soc-name">{`${props.label}`}</span>
            <Field component={Input}
                   className="input-group-form mt-3"
                   name={props.name}
                   validate={props.validators}/>
        </div>
    )
}

export default ProfileField;