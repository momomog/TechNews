import React, {ChangeEvent, useState} from "react";

import okIcon from '../../static/ok-icon.png'
import {change} from "redux-form";
import errorIcon from "../../static/error-icon.png";

/**
 *
 * @param input
 * @param meta
 * @param props
 * Контроль формы. Input type="file"
 */
export const FileInput = ({input, meta, ...props}) => {
    const [value, setValue] = useState(undefined);
    const isError = meta.touched && meta.error && !value;

    return (
        <div style={{width: '100%'}}>

            {
                props.placeholder && !props.showlabel &&
                <label className="col-sm-5 control-label required-field reg-label">
                    {props.placeholder}
                </label>
            }

            <div>
                <input {...input}
                       {...props}
                       onChange={(e: any) => {
                           const file = e.target.files[0]
                           setValue(file)
                           meta.dispatch(change(meta.form, input.name, file))

                           if (typeof props.onPreviewRender === 'function')
                               props.onPreviewRender(file)
                       }}
                       value={undefined}
                       style={{
                           backgroundImage: isError ? `url(${errorIcon})` : meta.touched ? `url(${okIcon})` : '',
                           backgroundPosition: `100% -10%`,
                           backgroundRepeat: `no-repeat`,
                           marginBottom: `0px`
                       }}
                />
            </div>

            {
                isError &&
                <div className="mr-5">
                    <div className="text-danger text-center validate-text">
                        {meta.error}
                    </div>
                </div>
            }

        </div>
    )
}