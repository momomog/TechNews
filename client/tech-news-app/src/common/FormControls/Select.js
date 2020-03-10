import React from "react";

import okIcon from '../../static/dialog-ok-apply-icon.png'
import errorIcon from '../../static/error-icon.png'

export const Select = ({input, meta, ...props}) => {
    const isError = meta.touched && meta.error;
    return (
        <div style={{width: '100%'}}>
            {
                props.placeholder && !props.showlabel &&
                <label className="col-sm-5 control-label required-field reg-label">
                    {props.placeholder}
                </label>
            }

            <div>
                <select {...input}
                          {...props}
                          style={{
                              border: isError ? '1px solid red' : meta.touched ? '1px solid green' : '',
                              backgroundImage: isError ? `url(${errorIcon})` : meta.touched ? `url(${okIcon})` : '',
                              backgroundPosition: `96% 50%`,
                              backgroundRepeat: `no-repeat`,
                              marginBottom: `0px`
                          }}>
                    <option value="" disabled defaultValue>Выберите тип...</option>
                    {
                        props.options.map( option => <option value={option.id} key={option.id}>{option.title}</option>)
                    }
                </select>
            </div>

            {
                isError &&
                <div className="col-12">
                    <div className="text-danger text-center validate-text">
                        {meta.error}
                    </div>
                </div>
            }
        </div>
    )
}