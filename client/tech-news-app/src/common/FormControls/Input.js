import React from "react";

import okIcon from '../../static/dialog-ok-apply-icon.png'
import errorIcon from '../../static/error-icon.png'

export const Input = ({input, meta, ...props}) => {
    const isError = meta.touched && meta.error;
    return (
        <div>
            {
                props.placeholder && !props.showLabel &&
                <label className="col-sm-5 control-label required-field reg-label">
                    {props.placeholder}
                </label>
            }

            <div>
                <input {...input}
                       {...props}
                       style={{
                           border: isError ? '1px solid red' : meta.touched ? '1px solid green' : '',
                           backgroundImage: isError ? `url(${errorIcon})` : meta.touched ? `url(${okIcon})` : '',
                           backgroundPosition: `96% 50%`,
                           backgroundRepeat: `no-repeat`,
                           marginBottom: `0px`
                       }}
                />
            </div>

            {
                isError && <div className="col-12">
                    <div className="text-danger text-center validate-text">
                        {meta.error}
                    </div>
                </div>
            }
        </div>
    )
}